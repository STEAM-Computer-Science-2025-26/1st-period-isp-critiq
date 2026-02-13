const http = require("http");
const crypto = require("crypto");

const PORT = 5000;

const users = [];
const sessions = new Map();

function sendJSON(res, statusCode, obj) {
    res.writeHead(statusCode, { "Content-Type": "application/json"});
    res.end(JSON.stringify(obj));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.on("data", (chunk) => {
            data += chunk;
            if (data.length > 1e6) {
                reject(new Error("Body too large"));
                req.destroy();
            }
        });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });
}

function safeJSONParse(str) {
    try{
        return { ok: true, value: str ? JSON.parse(str) : {} };
    } catch {
        return { ok: false, value: null };
    }
}

function hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
}

function getBearerToken(req) {
    const auth = req.headers.authorization || "";
    if (!auth.startsWith("Bearer ")) return null;
    return auth.slice(7);
}

function getAuthedUser(req) {
    const token = getBearerToken(req);
    if (!token) return null;

    const userId = sessions.get(token);
    if (!userId) return null;

    const user = users.find((u) => u.id === userId);
    if (!user) return null;

    return { id: user.id, email: user.email, token };
}

const server = http.createServer(async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }

    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);
    const path = url.pathname;

    if (path === "/health" && req.method === "GET") {
        return sendJSON(res, 200, { status: "ok" });
    }

    if (path === "/auth/register" && req.method === "POST") {
        const raw = await readBody(req);
        const parsed = safeJSONParse(raw);
        if (!parsed.ok) return sendJSON(res, 400, { error: "Invalid JSON body" });

        const { email, password } = parsed.value;

        if (typeof email !== "string" || !email.includes("@")) {
            return sendJSON(res, 400, { error: "Valid email is required" });
        }

        if (typeof password !== "string" || password.length < 8) {
            return sendJSON(res, 400, {
                error: "Password must be at least 8 characters long"
        });
    }

    const normalizedEmail = email.toLowerCase();
    const exists = users.some((u) => u.email === normalizedEmail);
    if (exists) {
        return sendJSON(res, 409, { error: "This email is already registered." });
    }

    const user = {
        id: crypto.randomUUID(),
        email: normalizedEmail,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
    };

    users.push(user);

    return sendJSON(res, 201, {
        id: user.id,
        email: user.email
    });
}

    if (path === "/auth/login" && req.method === "POST") {
        const raw = await readBody(req);
        const parsed = safeJSONParse(raw);
        if(!parsed.ok) return sendJSON(res, 400, { error: "Invalid JSON body" });

        const { email, password } = parsed.value;

        if (typeof email !== "string" || typeof password !== "string") {
            return sendJSON(res, 400, {
                error: "email and password are required"
            });
        }

        const user = users.find((u) => u.email === email.toLowerCase());
        if (!user) return sendJSON(res, 401, { error: "Invalid credentials" });
        
        const ok = user.passwordHash === hashPassword(password);
        if (!ok) return sendJSON(res, 401, { error: "Invalid credentials" });

        const token = crypto.randomUUID();
        sessions.set(token, user.id);

        return sendJSON(res, 200, { token });
    }

    if (path === "/auth/me" && req.method === "GET") {
        const authed = getAuthedUser(req);
        if (!authed) return sendJSON(res, 401, { error: "Unauthorized" });

        return sendJSON(res, 200, {
            user: {
                id: authed.id,
                email: authed.email
            }
        })
    }

    if (path === "/auth/logout" && req.method === "POST") {
        const authed = getAuthedUser(req);
        if (!authed) return sendJSON(res, 401, { error: "Unauthorized" });

        sessions.delete(authed.token);
        return sendJSON(res, 200, { ok: true });
    }

    return sendJSON(res, 404, {
        error: "Not found",
        path 
    });
});

server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
});