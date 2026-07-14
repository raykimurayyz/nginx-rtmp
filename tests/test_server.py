import importlib.util
import sys
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).parents[1] / "app" / "server.py"
SPEC = importlib.util.spec_from_file_location("relay_server", MODULE_PATH)
server = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = server
SPEC.loader.exec_module(server)


class ValidationTests(unittest.TestCase):
    def test_accepts_valid_destination(self):
        result = server.validate_config(
            {
                "destinations": [
                    {
                        "name": "Bilibili",
                        "serverUrl": "rtmp://live.example.com/live",
                        "streamKey": "secret-key",
                        "enabled": True,
                    }
                ]
            },
            server.default_config(),
        )
        self.assertEqual(result["destinations"][0]["serverUrl"], "rtmp://live.example.com/live")
        self.assertRegex(result["destinations"][0]["id"], r"^[a-f0-9]{32}$")

    def test_rejects_non_rtmp_scheme(self):
        with self.assertRaisesRegex(server.ValidationError, "rtmp"):
            server.validate_server_url("https://example.com/live")

    def test_rejects_config_injection(self):
        with self.assertRaisesRegex(server.ValidationError, "control"):
            server.validate_config(
                {
                    "destinations": [
                        {
                            "name": "bad\npush rtmp://attacker",
                            "serverUrl": "rtmp://example.com/live",
                            "streamKey": "key",
                            "enabled": True,
                        }
                    ]
                },
                server.default_config(),
            )

    def test_preserves_existing_key_when_edit_sends_blank(self):
        destination_id = "a" * 32
        existing = {
            "version": 1,
            "destinations": [
                {
                    "id": destination_id,
                    "name": "Old",
                    "serverUrl": "rtmp://old.example/live",
                    "streamKey": "existing-secret",
                    "enabled": True,
                }
            ],
        }
        result = server.validate_config(
            {
                "destinations": [
                    {
                        "id": destination_id,
                        "name": "New",
                        "serverUrl": "rtmp://new.example/live",
                        "streamKey": "",
                        "enabled": False,
                    }
                ]
            },
            existing,
        )
        self.assertEqual(result["destinations"][0]["streamKey"], "existing-secret")

    def test_render_quotes_untrusted_values(self):
        config = {
            "version": 1,
            "destinations": [
                {
                    "id": "b" * 32,
                    "name": "Test",
                    "serverUrl": "rtmp://example.com/live;deny all",
                    "streamKey": 'key";$name',
                    "enabled": True,
                }
            ],
        }
        rendered = server.render_push_config(config)
        self.assertIn('push "rtmp://example.com/live;deny all"', rendered)
        self.assertIn('playPath="key\\";\\$name";', rendered)

    def test_public_config_never_returns_secret(self):
        public = server.public_config(
            {
                "version": 1,
                "destinations": [
                    {
                        "id": "c" * 32,
                        "name": "Test",
                        "serverUrl": "rtmp://example.com/live",
                        "streamKey": "super-secret-value",
                        "enabled": True,
                    }
                ],
            }
        )
        self.assertNotIn("streamKey", public["destinations"][0])
        self.assertNotIn("super-secret-value", repr(public))


if __name__ == "__main__":
    unittest.main()

