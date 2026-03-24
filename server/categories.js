const http = require("http");

const PORT = 5000;

const categories = [
  {
    id: "hotels",
    label: "Hotels",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "Hotel Del Coronado",
    featuredLocation: "San Diego",
    route: "/categories/hotels",
  },
  {
    id: "restaurants",
    label: "Restaurants",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "Amara At Paraiso",
    featuredLocation: "Miami",
    route: "/categories/restaurants",
  },
  {
    id: "parks",
    label: "Parks",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "Central Park",
    featuredLocation: "New York City",
    route: "/categories/parks",
  },
  {
    id: "movie-theaters",
    label: "Movie Theaters",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "AMC Theater",
    featuredLocation: "Dallas",
    route: "/categories/movie-theaters",
  },
  {
    id: "apartments",
    label: "Apartments",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "The Ashton",
    featuredLocation: "Austin",
    route: "/categories/apartments",
  },
  {
    id: "shopping",
    label: "Shopping",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "Galleria",
    featuredLocation: "Houston",
    route: "/categories/shopping",
  },
  {
    id: "gyms",
    label: "Gyms",
    imageUrl: "", // frontend image URL path needed here
    featuredName: "Planet Fitness",
    featuredLocation: "Los Angeles",
    route: "/categories/gyms",
  },
];

function sendJSON(res, statusCode, obj) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
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
    return sendJSON(res, 200, {
      title: "Browse All Categories",
      categories,
    });
  }

  const match = path.match(/^\/categories\/([a-z0-9-]+)$/);
  if (match && req.method === "GET") {
    const id = match[1];
    const category = categories.find((c) => c.id === id);
    if (!category) return sendJSON(res, 404, { error: "Category not found", id });
    return sendJSON(res, 200, { category });
  }

  return sendJSON(res, 404, { error: "Not found", path });
});

server.listen(PORT, () => {
  console.log(`Categories backend running on port ${PORT}`);
});