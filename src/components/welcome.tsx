import AnimatedBlurText from "./AnimatedBlurText";
import { useEffect, useState } from "react";

interface ClientInfo {
  ip?: string;
  [key: string]: any;
}

function Welcome() {
  const [clientInfo, setClientInfo] = useState<ClientInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/ip");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType?.includes("application/json")) {
          const text = await response.text();
          console.warn("API NOT JSON:", text.slice(0, 100));
          setClientInfo({ ip: "Unknown", error: "Invalid response format" });
          return;
        }

        const data = await response.json();

        const clientData = {
          ...data,
          platform:
            typeof navigator !== "undefined" ? navigator.platform : "Unknown",
          timezone:
            typeof Intl !== "undefined"
              ? Intl.DateTimeFormat().resolvedOptions().timeZone
              : "Unknown",
          screenResolution:
            typeof window !== "undefined"
              ? `${window.screen.width}x${window.screen.height}`
              : "Unknown",
        };

        setClientInfo(clientData);
        setError(null);
      } catch (err) {
        console.error("Error fetching client info:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setClientInfo({
          ip: "192.168.1.1",
          city: "Unknown",
          country: "Unknown",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, []);

  const formatIpForDisplay = (info: ClientInfo | null) => {
    if (!info) return "";
    const ip = info.ip || info.xVercelIp || info.xForwardedFor;
    if (ip) {
      const cleanIp = typeof ip === "string" ? ip.split(",")[0].trim() : ip;
      return cleanIp;
    }
    return "0.0.0.0";
  };

  const formatCityForDisplay = (info: ClientInfo | null) => {
    if (!info) return "";
    const city =
      info.city || info.location?.city || info["x-vercel-ip-city"] || "UNKNOWN";
    const country =
      info.country ||
      info.location?.country ||
      info["x-vercel-ip-country"] ||
      "XX";
    return `${city.toUpperCase()}, ${country.toUpperCase()}`;
  };

  const formatLatForDisplay = (info: ClientInfo | null) => {
    if (!info) return "";
    const lat =
      info.lat ||
      info.location?.lat ||
      info["x-vercel-ip-latitude"] ||
      "UNKNOWN";
    return `${lat.toUpperCase()}`;
  };

  const formatLonForDisplay = (info: ClientInfo | null) => {
    if (!info) return "";
    const lat =
      info.lon ||
      info.location?.lon ||
      info["x-vercel-ip-longitude"] ||
      "UNKNOWN";
    return `${lat.toUpperCase()}`;
  };

  return (
    <div className="welcome">
      <div className="title-line">
        <span className="prompt">$</span>
        <span className="cmd">./he4vyl0v3 --scan --target {clientInfo?.ip || "unknown"}</span>
      </div>

      <h1>He4vyL0v3</h1>

      <div className="subtitle-line">{'//'} SECURITY RESEARCH &amp; PENTESTING</div>

      <div className="float-text float-lat">
        <span className="float-label">LAT</span>
        <AnimatedBlurText
          text={formatLatForDisplay(clientInfo)}
          duration={1000}
        />
      </div>

      <div className="float-text float-lon">
        <span className="float-label">LON</span>
        <AnimatedBlurText
          text={formatLonForDisplay(clientInfo)}
          duration={1000}
        />
      </div>

      <div className="float-text float-ip">
        <span className="float-label">TARGET</span>
        <AnimatedBlurText
          text={formatIpForDisplay(clientInfo)}
          duration={800}
          characters="0123456789.#"
        />
        {loading && <span className="float-loading">###.###.###.###</span>}
        {error && <span className="float-error">({error})</span>}
      </div>

      <div className="float-text float-bssid">
        <span className="float-label">BSSID</span>
        <AnimatedBlurText
          text="EA:A3:C4:1B:A2:85"
          duration={900}
          characters="ABCDEF0123456789:"
        />
      </div>

      <div className="float-text float-location">
        <span className="float-label">LOCATION</span>
        <AnimatedBlurText
          text={formatCityForDisplay(clientInfo)}
          duration={1100}
          characters="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm"
        />
      </div>

      <div className="float-text float-dorking">
        <span className="float-label">DORKING</span>
        <AnimatedBlurText
          text={`'${formatIpForDisplay(clientInfo)}'`}
          duration={1300}
        />
      </div>

      <div className="float-text float-referer">
        <span className="float-label">REFERER</span>
        <AnimatedBlurText
          text={clientInfo?.referer || "DIRECT"}
          duration={950}
          characters="QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm.-_:/"
        />
      </div>

      <div className="float-text float-platform">
        <span className="float-label">PLATFORM</span>
        <AnimatedBlurText
          text={(clientInfo?.platform || "UNKNOWN").toUpperCase()}
          duration={800}
          characters="QWERTYUIOPASDFGHJKLZXCVBNM0123456789"
        />
      </div>

      <div className="float-text float-timezone">
        <span className="float-label">TZ</span>
        <AnimatedBlurText
          text={(clientInfo?.timezone || "UNKNOWN").toUpperCase()}
          duration={1050}
          characters="QWERTYUIOPASDFGHJKLZXCVBNM0123456789/_"
        />
      </div>
    </div>
  );
}

export default Welcome;
