require("dotenv").config({ path: ".env.local" });

const http = require("http");
const { createClient } = require("@supabase/supabase-js");

const PORT = 5000;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

function sendJSON(res, statusCode, obj) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const path = url.pathname;

  if (path === "/health" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }

  if (path === "/categories" && req.method === "GET") {
    const { data, error } = await supabase
      .from("categories")
      .select("id, label, imageUrl, featuredName, featuredLocation, route")
      .order("label", { ascending: true });

    if (error) {
      return sendJSON(res, 500, { error: error.message });
    }

    return sendJSON(res, 200, {
      title: "Browse All Categories",
      categories: data,
    });
  }

  const match = path.match(/^\/categories\/([a-z0-9-]+)$/);
  if (match && req.method === "GET") {
    const id = match[1];

    const { data, error } = await supabase
      .from("categories")
      .select("id, label, imageUrl, featuredName, featuredLocation, route")
      .eq("id", id)
      .single();

    if (error || !data) {
      return sendJSON(res, 404, { error: "Category not found", id });
    }

    return sendJSON(res, 200, { category: data });
  }

  return sendJSON(res, 404, { error: "Not found", path });
});

server.listen(PORT, () => {
  console.log(`Categories backend running on port ${PORT}`);
});