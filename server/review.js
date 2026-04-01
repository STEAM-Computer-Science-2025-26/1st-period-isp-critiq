// This lets us create a backend server with Node.js.
const http = require("http");

// This is used to make a unique ID for each review.
const crypto = require("crypto");

// This is the port number for the reviews server.
const PORT = 5001;

// This array stores all reviews for now.
// It works for testing, but it resets every time the server restarts.
const reviews = [];

// This helper function sends JSON data back to the frontend.
function sendJSON(res, code, data) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
}

// This helper function reads the data sent in a POST request.
function readBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(data));
  });
}

// This creates the backend server.
const server = http.createServer(async (req, res) => {
  // These lines allow the frontend to connect to this backend.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // This handles browser permission checks before the real request happens.
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // This reads the URL and gets the path being requested.
  const url = new URL(req.url, `http://${req.headers.host}`);
  const path = url.pathname;

  // This is a simple test route to make sure the server is working.
  if (path === "/health" && req.method === "GET") {
    return sendJSON(res, 200, { status: "ok" });
  }

  // This route sends back all reviews currently stored in the array.
  if (path === "/reviews" && req.method === "GET") {
    return sendJSON(res, 200, { reviews });
  }

  // This route adds a new review.
  if (path === "/reviews" && req.method === "POST") {
    // Read the data sent from the frontend.
    const raw = await readBody(req);

    let body = {};

    // Try to turn the incoming text into JSON.
    // If the format is wrong, send an error.
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      return sendJSON(res, 400, { error: "Invalid JSON" });
    }

    // Take the needed fields from the request body.
    const { placeName, rating, text } = body;

    // Make sure all required fields were included.
    if (!placeName || !rating || !text) {
      return sendJSON(res, 400, { error: "placeName, rating, text required" });
    }

    // Create a new review object.
    const review = {
      id: crypto.randomUUID(),
      placeName,
      rating,
      text,
      createdAt: new Date().toISOString(),
    };

    // Add the new review into the reviews array.
    reviews.push(review);

    // Send the newly created review back as confirmation.
    return sendJSON(res, 201, { review });
  }

  // If the route does not match anything above, send a 404 error.
  return sendJSON(res, 404, { error: "Not found", path });
});

// This starts the server and shows a message in the terminal.
server.listen(PORT, () => {
  console.log(`Reviews backend running on port ${PORT}`);
});