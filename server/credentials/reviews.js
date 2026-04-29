const crypto = require("crypto");

async function reviews(req, res, supabase, sendJSON, readBody) {

//get reviews
// 🔹 GET REVIEWS (FILTER BY COMPANY)
  if (req.method === "GET") {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const company = url.searchParams.get("company");

    let query = supabase
      .from("Reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (company) {
      query = query.eq("company", company); // 🔥 FILTER
    }

    const { data, error } = await query;

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

    const { title, content, rating, company, category } = body;

    if (!title || !content || !rating || !company) {
      return sendJSON(res, 400, { error: "Missing fields" });
    }

    const { data, error } = await supabase
      .from("Reviews") // ⚠️ EXACT table name
      .insert([
        {
          title,
          content,
          rating,
          company, // 🔥 THIS IS WHAT YOU WERE MISSING/BREAKING
          category: category || "general",
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("INSERT ERROR:", error);
      return sendJSON(res, 500, { error: "Insert failed" });
    }

    return sendJSON(res, 201, data);
  }

  if (error) {
    return sendJSON(res, 500, { error: error.message });
  }

  return sendJSON(res, 405, { error: "Method not allowed" });
}

module.exports = reviews;