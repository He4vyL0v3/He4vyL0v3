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
          console.warn("API вернул не JSON:", text.slice(0, 100));
          setClientInfo({ ip: "Unknown", error: "Invalid response format" });
          return;
        }

        const data = await response.json();
        setClientInfo(data);
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

  return (
    <div className="welcome">
      <h1>He4vyL0v3</h1>

      <div className="float-text" style={{ top: "10%", left: "40%" }}>
        PASSWORD:{" "}
        <AnimatedBlurText
          text="$5$5f4dcc3b5aa765d61d8327deb882cf99"
          duration={1200}
        />
      </div>

      <div className="float-text" style={{ top: "35%", left: "30%" }}>
        PAYLOAD:{" "}
        <AnimatedBlurText text="meterpreter_reverse_tcp" duration={1000} />
      </div>

      <div className="float-text" style={{ bottom: "20%", right: "5%" }}>
        TARGET IP:{" "}
        <AnimatedBlurText
          text={formatIpForDisplay(clientInfo)}
          duration={800}
          characters="0123456789."
        />
        {loading && (
          <span style={{ fontSize: "0.8em", opacity: 0.7 }}> (loading...)</span>
        )}
        {error && (
          <span style={{ fontSize: "0.8em", color: "#ff5555" }}>
            {" "}
            ({error})
          </span>
        )}
      </div>

      <div className="float-text" style={{ bottom: "25%", left: "20%" }}>
        LOCATION:{" "}
        <AnimatedBlurText
          text={formatCityForDisplay(clientInfo)}
          duration={800}
          characters="QWERTYUIOPASDFGHJKLZXCVBNM"
        />
        {loading && <span style={{ fontSize: "0.8em", opacity: 0.7 }}></span>}
        {error && <span style={{ fontSize: "0.8em", color: "#ff5555" }}></span>}
      </div>

      <div className="float-text" style={{ top: "30%", left: "70%" }}>
        BSSID:{" "}
        <AnimatedBlurText
          text="EA:A3:C4:1B:A2:85"
          duration={900}
          characters="ABCDEF0123456789:"
        />
      </div>

      <div className="float-text" style={{ bottom: "30%", left: "64%" }}>
        FOUND: <AnimatedBlurText text="CVE-2020-0796" duration={1100} />
      </div>

      <div className="float-text" style={{ bottom: "5%", left: "60%" }}>
        USERNAME:{" "}
        <AnimatedBlurText
          text="ADMIN"
          duration={700}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        />
      </div>

      <div className="float-text" style={{ bottom: "13.4%", left: "30%" }}>
        DORKING: <AnimatedBlurText text="account.php?action=" duration={1300} />
      </div>

      <div className="float-text" style={{ top: "25%", left: "35%" }}>
        <AnimatedBlurText
          text="RKN.GOV.RU FUCK YOU"
          duration={700}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        />
      </div>

      {process.env.NODE_ENV === "development" && clientInfo && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            background: "rgba(0,0,0,0.8)",
            color: "#0f0",
            padding: "10px",
            fontSize: "10px",
            maxWidth: "300px",
            maxHeight: "200px",
            overflow: "auto",
            zIndex: 1000,
            fontFamily: "monospace",
          }}
        >
          <strong>Debug Info:</strong>
          <pre>{JSON.stringify(clientInfo, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default Welcome;
