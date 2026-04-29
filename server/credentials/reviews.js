const crypto = require("crypto");

async function reviews(req, res, supabase, sendJSON, readBody) {

  // 🔹 GET REVIEWS
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("Reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return sendJSON(res, 500, { error: "Failed to fetch reviews" });
    }

    return sendJSON(res, 200, data);
  }

  // 🔹 CREATE REVIEW
  if (req.method === "POST") {
    const raw = await readBody(req);

    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return sendJSON(res, 400, { error: "Invalid JSON" });
    }

    const { title, content, rating, category } = body;

    // ✅ FIXED VALIDATION
    if (!title || !content || rating === 0) {
      return sendJSON(res, 400, { error: "Missing fields" });
    }

    const { data, error } = await supabase
      .from("Reviews") // make sure EXACT table name
      .insert([
        {
          title,
          content,
          rating,
          category: category || "general",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      return sendJSON(res, 500, { error: error.message }); // 🔥 IMPORTANT
    }

    return sendJSON(res, 201, data);
  }

  if (error) {
    return sendJSON(res, 500, { error: error.message });
  }

  return sendJSON(res, 405, { error: "Method not allowed" });
}

module.exports = reviews;