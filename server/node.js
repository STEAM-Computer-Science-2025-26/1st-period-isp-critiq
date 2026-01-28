const http = require("http");

const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.url === "/health" && req.method === "GET") {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify({ status: "ok"}));
        return;
    }

    res.writeHead(404, {"Content-Type": "application/json" });
    res.end(JSON.stringify({error: "Not found"}));
});

server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});