import importlib.util
import sys
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).parents[1] / "app" / "server.py"
SPEC = importlib.util.spec_from_file_location("relay_server", MODULE_PATH)
server = importlib.util.module_from_spec(SPEC)
sys.modules[SPEC.name] = server
SPEC.loader.exec_module(server)


def sample_config(mode="serverKey"):
    destination = {"id": "b" * 32, "name": "Bilibili", "mode": mode, "enabled": True}
    if mode == "fullUrl":
        destination["pushUrl"] = "rtmp://live.example.com/app?key=super-secret"
    else:
        destination.update({"serverUrl": "rtmp://live.example.com/live", "streamKey": "secret-key"})
    return {
        "version": 2,
        "revision": 1,
        "settings": server.default_settings(),
        "routes": [
            {
                "id": "a" * 32,
                "name": "PlayStation",
                "application": "app",
                "enabled": True,
                "allowPlay": True,
                "idleStreams": False,
                "waitKey": False,
                "dropIdlePublisherSeconds": 0,
                "pushReconnectSeconds": 1,
                "destinationIds": ["b" * 32],
            }
        ],
        "destinations": [destination],
    }


class ValidationTests(unittest.TestCase):
    def test_default_config_supports_playstation_and_generic_rtmp(self):
        config = server.default_config()
        self.assertEqual({route["application"] for route in config["routes"]}, {"app", "live"})

    def test_accepts_valid_version_two_config(self):
        result = server.validate_config(sample_config(), server.empty_config())
        self.assertEqual(result["routes"][0]["application"], "app")
        self.assertEqual(result["destinations"][0]["serverUrl"], "rtmp://live.example.com/live")

    def test_migrates_version_one_configuration(self):
        migrated = server.migrate_config(
            {
                "version": 1,
                "destinations": [
                    {"name": "Old", "serverUrl": "rtmp://old.example/live", "streamKey": "old-key", "enabled": True}
                ],
            }
        )
        validated = server.validate_config(migrated, server.empty_config())
        self.assertEqual(validated["version"], 2)
        self.assertEqual(validated["routes"][0]["application"], "live")
        self.assertEqual(validated["routes"][0]["destinationIds"], [validated["destinations"][0]["id"]])

    def test_rejects_duplicate_application_names(self):
        config = sample_config()
        duplicate = dict(config["routes"][0])
        duplicate["id"] = "c" * 32
        config["routes"].append(duplicate)
        with self.assertRaisesRegex(server.ValidationError, "already configured"):
            server.validate_config(config, server.empty_config())

    def test_rejects_invalid_application_name(self):
        config = sample_config()
        config["routes"][0]["application"] = "app; deny all"
        with self.assertRaisesRegex(server.ValidationError, "letters"):
            server.validate_config(config, server.empty_config())

    def test_rejects_unknown_destination_binding(self):
        config = sample_config()
        config["routes"][0]["destinationIds"] = ["c" * 32]
        with self.assertRaisesRegex(server.ValidationError, "unknown destination"):
            server.validate_config(config, server.empty_config())

    def test_rejects_non_rtmp_scheme(self):
        with self.assertRaisesRegex(server.ValidationError, "rtmp"):
            server.validate_server_url("https://example.com/live")

    def test_preserves_existing_secret_when_edit_sends_blank(self):
        existing = server.validate_config(sample_config(), server.empty_config())
        update = sample_config()
        update["destinations"][0]["streamKey"] = ""
        result = server.validate_config(update, existing)
        self.assertEqual(result["destinations"][0]["streamKey"], "secret-key")

    def test_render_quotes_untrusted_destination_values(self):
        config = sample_config()
        config["destinations"][0]["serverUrl"] = "rtmp://example.com/live;deny all"
        config["destinations"][0]["streamKey"] = 'key";$name'
        validated = server.validate_config(config, server.empty_config())
        rendered = server.render_rtmp_config(validated)
        self.assertIn("application app {", rendered)
        self.assertIn('push "rtmp://example.com/live;deny all"', rendered)
        self.assertIn('playPath="key\\";\\$name";', rendered)

    def test_full_push_url_is_generated_but_never_returned(self):
        config = server.validate_config(sample_config("fullUrl"), server.empty_config())
        rendered = server.render_rtmp_config(config)
        public = server.public_config(config)
        self.assertIn('push "rtmp://live.example.com/app?key=super-secret";', rendered)
        self.assertNotIn("super-secret", repr(public))
        self.assertEqual(public["destinations"][0]["pushUrlHint"], "rtmp://live.example.com/••••••")

    def test_nginx_errors_do_not_expose_destination_secrets(self):
        config = sample_config(mode="fullUrl")
        secret = config["destinations"][0]["pushUrl"]
        message = f'host not found in url "{secret}"'
        redacted = server.redact_nginx_error(message, config)
        self.assertNotIn("super-secret", redacted)
        self.assertIn("rtmp://live.example.com/••••••", redacted)

    def test_ipv6_push_url_hint_keeps_brackets(self):
        self.assertEqual(server.mask_push_url("rtmp://[2001:db8::1]:1935/app/key"), "rtmp://[2001:db8::1]:1935/••••••")


class RtmpStatusTests(unittest.TestCase):
    def test_parses_multiple_applications_media_and_connections(self):
        payload = b"""<?xml version="1.0"?>
        <rtmp>
          <nginx_version>1.30.4</nginx_version><nginx_rtmp_version>1.2.2</nginx_rtmp_version>
          <uptime>3601</uptime><naccepted>9</naccepted><bw_in>6000000</bw_in>
          <bytes_in>1048576</bytes_in><bw_out>12000000</bw_out><bytes_out>2097152</bytes_out>
          <server><application><name>app</name><live><stream>
            <name>live_ps5</name><time>65000</time><bw_in>6000000</bw_in><bytes_in>1048576</bytes_in>
            <bw_out>12000000</bw_out><bytes_out>2097152</bytes_out><bw_video>5800000</bw_video><bw_audio>200000</bw_audio>
            <meta><video><codec>H264</codec><profile>High</profile><level>4.1</level><width>1920</width><height>1080</height><frame_rate>60</frame_rate></video>
              <audio><codec>AAC</codec><profile>LC</profile><sample_rate>48000</sample_rate><channels>2</channels></audio></meta>
            <client><id>7</id><address>192.168.1.20</address><time>65000</time><dropped>3</dropped><avsync>-12</avsync><timestamp>64000</timestamp><publishing/><active/></client>
            <nclients>1</nclients><publishing/><active/>
          </stream></live></application><application><name>live</name><live><stream><name>obs</name><nclients>0</nclients></stream></live></application></server>
        </rtmp>"""
        result = server.parse_rtmp_status(payload)
        self.assertEqual(len(result["activeStreams"]), 2)
        stream = result["activeStreams"][0]
        self.assertEqual(stream["application"], "app")
        self.assertEqual(stream["video"]["width"], 1920)
        self.assertEqual(stream["connections"][0]["role"], "publishing")

    def test_missing_optional_metadata_is_returned_as_null(self):
        payload = b"<rtmp><server><application><name>camera</name><live><stream><name>test</name><nclients>0</nclients></stream></live></application></server></rtmp>"
        stream = server.parse_rtmp_status(payload)["activeStreams"][0]
        self.assertEqual(stream["application"], "camera")
        self.assertIsNone(stream["video"]["codec"])
        self.assertIsNone(stream["audio"]["sampleRate"])


if __name__ == "__main__":
    unittest.main()
