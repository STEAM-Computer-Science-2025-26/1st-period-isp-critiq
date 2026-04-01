// This loads the hidden values from our .env.local file,
// like our Supabase link and private key.
require("dotenv").config({ path: ".env.local" });

// This lets us create a backend server with Node.js.
const http = require("http");

// This lets our backend connect to the Supabase database.
const { createClient } = require("@supabase/supabase-js");

// This is the port number for this categories server.
const PORT = 5000;

// This connects our backend to the Supabase database.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      // These are turned off because this file is only being used
      // to get data from the database, not manage user sign-in sessions.
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);

// This is a helper function that sends JSON data back to the frontend.
function sendJSON(res, statusCode, obj) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

// This creates the backend server.
const server = http.createServer(async (req, res) => {
  // These lines allow the frontend to connect to this backend.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // This handles browser permission checks before the real request happens.
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // This reads the URL and gets the path the user is requesting.
  const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const path = url.pathname;

  // This is a simple test route to make sure the server is working.
  if (path === "/health" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }

  // This route gets all categories from the database.
  if (path === "/categories" && req.method === "GET") {
    const { data, error } = await supabase
      .from("categories")
      .select("id, label, imageUrl, featuredName, featuredLocation, route")
      .order("label", { ascending: true });

    // If something goes wrong, this sends back an error message.
    if (error) {
      return sendJSON(res, 500, { error: error.message });
    }

    // If it works, this sends all category data back to the frontend.
    return sendJSON(res, 200, {
      title: "Browse All Categories",
      categories: data,
    });
  }

  // This checks if the request is asking for one specific category,
  // like /categories/hotels.
  const match = path.match(/^\/categories\/([a-z0-9-]+)$/);
  if (match && req.method === "GET") {
    const id = match[1];

    // This looks for one category in the database using its id.
    const { data, error } = await supabase
      .from("categories")
      .select("id, label, imageUrl, featuredName, featuredLocation, route")
      .eq("id", id)
      .single();

    // If that category does not exist, this sends a not found message.
    if (error || !data) {
      return sendJSON(res, 404, { error: "Category not found", id });
    }

    // If found, this sends that one category back.
    return sendJSON(res, 200, { category: data });
  }

  // If the route does not match anything above, this sends a 404 error.
  return sendJSON(res, 404, { error: "Not found", path });
});

// This starts the server and shows a message in the terminal.
server.listen(PORT, () => {
  console.log(`Categories backend running on port ${PORT}`);
});