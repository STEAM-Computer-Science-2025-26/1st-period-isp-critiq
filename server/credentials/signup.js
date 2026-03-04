// backend/signup.js
const http = require("http");
const crypto = require("crypto");

const PORT = 5001; // different port so it won’t conflict

// Mock DB
const users = [];

function sendJSON(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => { data += chunk; });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }
  if (req.url === "/" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }
  if (req.url === "/signup" && req.method === "POST") {
    const raw = await readBody(req);
    let body;
    try { body = JSON.parse(raw); } catch { return sendJSON(res, 400, { error: "Invalid JSON" }); }

    const { email, password } = body;
    if (!email || !email.includes("@")) return sendJSON(res, 400, { error: "Valid email required" });
    if (!password || password.length < 8) return sendJSON(res, 400, { error: "Password too short" });

    const exists = users.find(u => u.email === email.toLowerCase());
    if (exists) return sendJSON(res, 409, { error: "Email already exists" });

    const user = { id: crypto.randomUUID(), email: email.toLowerCase(), passwordHash: hashPassword(password) };
    users.push(user);

    return sendJSON(res, 201, { id: user.id, email: user.email });
  }

  sendJSON(res, 404, { error: "Not Found" });
});

server.listen(PORT, () => console.log(`Signup server running on port ${PORT}`));