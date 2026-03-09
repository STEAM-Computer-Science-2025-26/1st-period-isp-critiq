const http = require("http");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const signup = require("./credentials/signup");
const login = require("./credentials/login");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const PORT = 5001;

function sendJSON(res, status, obj) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", chunk => data += chunk);
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  if (req.url === "/" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }

  if (req.url === "/signup" && req.method === "POST") {
    return signup(req, res, supabase, sendJSON, readBody);
  }

  if (req.url === "/login" && req.method === "POST") {
    return login(req, res, supabase, sendJSON, readBody);
  }

  sendJSON(res, 404, { error: "Not Found" });

});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});