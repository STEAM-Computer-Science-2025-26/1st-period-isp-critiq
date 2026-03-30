async function me(req, res, supabase, sendJSON) {
  const cookies = req.headers.cookie;
  console.log("COOKIE HEADER:", cookies);

  if (!cookies) {
    return sendJSON(res, 401, { error: "Not authenticated" });
  }

  const sessionId = cookies
    .split(";")
    .find((c) => c.trim().startsWith("session="))
    ?.split("=")[1];

  if (!sessionId) {
    return sendJSON(res, 401, { error: "Not authenticated" });
  }

  const { data: user, error } = await supabase
    .from("user_base")
    .select("id, email, username")
    .eq("id", Number(sessionId))
    .maybeSingle();

  if (error) {
    console.error("SUPABASE ERROR:", error);
    return sendJSON(res, 500, { error: "Server error" });
  }

  if (!user) {
    return sendJSON(res, 401, { error: "Invalid session" });
  }

  console.log("SESSION ID:", sessionId);
  console.log("USER FOUND:", user);

  return sendJSON(res, 200, {
    id: user.id,
    email: user.email,
    username: user.username,
  });
}

module.exports = me;