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


class RtmpStatusTests(unittest.TestCase):
    def test_parses_stream_media_traffic_and_connections(self):
        payload = b"""<?xml version="1.0"?>
        <rtmp>
          <nginx_version>1.28.0</nginx_version>
          <nginx_rtmp_version>1.2.2</nginx_rtmp_version>
          <uptime>3601</uptime><naccepted>9</naccepted>
          <bw_in>6000000</bw_in><bytes_in>1048576</bytes_in>
          <bw_out>12000000</bw_out><bytes_out>2097152</bytes_out>
          <server><application><name>live</name><live><stream>
            <name>camera</name><time>65000</time>
            <bw_in>6000000</bw_in><bytes_in>1048576</bytes_in>
            <bw_out>12000000</bw_out><bytes_out>2097152</bytes_out>
            <bw_video>5800000</bw_video><bw_audio>200000</bw_audio>
            <meta><video><codec>H264</codec><profile>High</profile><level>4.1</level>
              <width>1920</width><height>1080</height><frame_rate>60</frame_rate></video>
              <audio><codec>AAC</codec><profile>LC</profile><sample_rate>48000</sample_rate>
              <channels>2</channels></audio></meta>
            <client><id>7</id><address>192.168.1.20</address><time>65000</time>
              <dropped>3</dropped><avsync>-12</avsync><timestamp>64000</timestamp>
              <publishing/><active/></client>
            <nclients>1</nclients><publishing/><active/>
          </stream></live></application></server>
        </rtmp>"""

        result = server.parse_rtmp_status(payload)

        self.assertEqual(result["runtime"]["acceptedConnections"], 9)
        stream = result["activeStreams"][0]
        self.assertEqual(stream["bandwidthIn"], 6000000)
        self.assertEqual(stream["video"]["width"], 1920)
        self.assertEqual(stream["audio"]["sampleRate"], 48000)
        self.assertEqual(stream["connections"][0]["address"], "192.168.1.20")
        self.assertEqual(stream["connections"][0]["role"], "publishing")
        self.assertTrue(stream["connections"][0]["active"])

    def test_missing_optional_metadata_is_returned_as_null(self):
        payload = b"<rtmp><server><application><live><stream><name>test</name>"
        payload += b"<nclients>0</nclients></stream></live></application></server></rtmp>"

        stream = server.parse_rtmp_status(payload)["activeStreams"][0]

        self.assertIsNone(stream["video"]["codec"])
        self.assertIsNone(stream["audio"]["sampleRate"])
        self.assertEqual(stream["connections"], [])


if __name__ == "__main__":
    unittest.main()
