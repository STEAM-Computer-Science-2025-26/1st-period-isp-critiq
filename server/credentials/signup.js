const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function signup(req, res, supabase, sendJSON, readBody) {
  console.log("Signup route hit");
  const raw = await readBody(req);
  let body;

  try {
    body = JSON.parse(raw);
  } catch {
    return sendJSON(res, 400, { error: "Invalid JSON" });
  }

  const { username, email, password } = body;

  if (!username)
    return sendJSON(res, 400, { error: "Username required" });

  if (!email || !email.includes("@"))
    return sendJSON(res, 400, { error: "Valid email required" });

  if (!password || password.length < 8)
    return sendJSON(res, 400, { error: "Password must be at least 8 characters" });

  const passwordHash = hashPassword(password);

  const { data: existing } = await supabase
    .from("user_base")
    .select("id")
    .eq("email", email.toLowerCase())
    .maybeSingle();
/*
  if (existing) {
    return sendJSON(res, 400, { error: "Email already registered" });
  }
*/
  const { error } = await supabase
    .from("user_base")
    .insert([
      {
        username,
        email: email.toLowerCase(),
        password: passwordHash
      }
    ]);

  if (error) {
    console.log("SUPABASE ERROR:", error);

    if (error.code === "23505") {
      return sendJSON(res, 400, { error: "Email already registered" });
    }

    if (error.code === "42501") {
      return sendJSON(res, 500, { error: "Database permission error" });
    }

    return sendJSON(res, 500, { error: "Database error" });
  }
  return sendJSON(res, 201, { success: true });

}

module.exports = signup;