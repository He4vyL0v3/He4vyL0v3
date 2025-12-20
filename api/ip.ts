module.exports = (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const forwarded = req.headers["x-forwarded-for"];
  const realIp = req.headers["x-real-ip"];
  const vercelIp = req.headers["x-vercel-ip"];
  const cfConnectingIp = req.headers["cf-connecting-ip"];

  let ip = "127.0.0.1";
  if (realIp) ip = realIp;
  else if (forwarded) ip = forwarded.split(",")[0].trim();
  else if (vercelIp) ip = vercelIp;
  else if (cfConnectingIp) ip = cfConnectingIp;
  else if (req.socket && req.socket.remoteAddress) {
    ip = req.socket.remoteAddress;
  }

  console.log(req);

  const response = {
    ip: ip,
    country: req.headers["x-vercel-ip-country"] || "Unknown",
    city: req.headers["x-vercel-ip-city"] || "Unknown",
    region: req.headers["x-vercel-ip-region"] || "Unknown",
    userAgent: req.headers["user-agent"],
    timestamp: new Date().toISOString(),
    method: req.method,
    lat: req.headers["x-vercel-ip-latitude"]?.toString() || "Unknown",
    lon: req.headers["x-vercel-ip-longitude"]?.toString() || "Unknown",
  };

  res.status(200).json(response);
};
