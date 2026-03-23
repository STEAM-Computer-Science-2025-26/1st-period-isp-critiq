const http = require("http");
const crypto = require("crypto");

const PORT = 5001;
const reviews = [];

function sendJSON(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  if (path === "/health" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }

  // GET /reviews -> returns all reviews
  if (path === "/reviews" && req.method === "GET") {
    return sendJSON(res, 200, { reviews });
  }

  // POST /reviews -> adds a review
  if (path === "/reviews" && req.method === "POST") {
    const raw = await readBody(req);
    let body = {};
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      return sendJSON(res, 400, { error: "Invalid JSON" });
    }

    const { placeName, rating, text } = body;

    if (!placeName || !rating || !text) {
      return sendJSON(res, 400, { error: "placeName, rating, text required" });
    }

    const review = {
      id: crypto.randomUUID(),
      placeName,
      rating,
      text,
      createdAt: new Date().toISOString(),
    };

    reviews.push(review);
    return sendJSON(res, 201, { review });
  }

  return sendJSON(res, 404, { error: "Not found", path });
});

server.listen(PORT, () => {
  console.log(`Reviews backend running on port ${PORT}`);
});