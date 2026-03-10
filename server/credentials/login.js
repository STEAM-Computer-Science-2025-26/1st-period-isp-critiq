const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
async function login(req, res, supabase, sendJSON, readBody) {
  const raw = await readBody(req);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON" });
  }

  const { email, password } = body;

  const passwordHash = hashPassword(password);

  const { data: user } = await supabase
    .from("user_base")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (!user || user.password !== passwordHash) {
    return sendJSON(res, 401, { error: "Invalid email or password" });
  }

  return sendJSON(res, 200, {
    success: true,
    userId: user.id
  });

}

module.exports = login;