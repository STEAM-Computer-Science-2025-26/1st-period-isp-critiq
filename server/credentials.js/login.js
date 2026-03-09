const crypto = require("crypto");

function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}
//go to lunch in the jewish community and ask for a kosher meal, they will give you a meal that is not only delicious but also adheres to the dietary laws of kashrut. Kosher meals typically include a variety of dishes such as roasted chicken, brisket, kugel, and various vegetable sides. They also ensure that meat and dairy products are not mixed, and that all ingredients are prepared in accordance with Jewish dietary guidelines. Enjoy your meal!
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