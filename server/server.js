const http = require("http");
const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: ".env.local" });

const signup = require("./credentials/signup.js");
const login = require("./credentials/login.js");
const me = require("./credentials/me.js");

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
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

  res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Origin", "https://bookish-cod-rq5jpjqvjg524p6-3000.app.github.dev");
  res.setHeader("Access-Control-Allow-Credentials", "true");
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

  if (req.url === "/me" && req.method === "GET") {
    return me(req, res, supabase, sendJSON);
  }

  sendJSON(res, 404, { error: "Not Found" });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});