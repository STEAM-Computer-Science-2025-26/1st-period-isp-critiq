const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
async function login(req, res, supabase, sendJSON, readBody) {
  console.log("LOGIN ROUTE HIT");
  const raw = await readBody(req);
  let body;
  try {
    body = JSON.parse(raw);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON" });
  }

  const { email, password } = body;

  console.log(email.toLowerCase(), hashPassword(password));

  const passwordHash = hashPassword(password);
  const { data: allUsers } = await supabase
    .from("user_base")
    .select("email");

  console.log("ALL EMAILS:", allUsers);

  const { data: user, error } = await supabase
    .from("user_base")
    .select("email, password")
    .eq("email", email.toLowerCase())
    .eq("password", passwordHash)
    .maybeSingle();

  if (!user || user.password !== passwordHash) {
    console.log(user)
    console.log(error)
    return sendJSON(res, 401, { error: "Invalid email or password" });
  }

  return sendJSON(res, 200, {
    success: true,
    userId: user.id
  });

}

module.exports = login;