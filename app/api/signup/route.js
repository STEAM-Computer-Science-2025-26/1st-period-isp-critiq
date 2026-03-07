import { supabase } from "@/lib/supabase";

export async function POST(req) {
  const body = await req.json();
  const { username, email, password } = body;

  const { data, error } = await supabase
    .from("user_base")
    .insert([
      {
        username: username,
        email: email,
        password: password
      }
    ]);

  if (error) {
    return Response.json({ error: error.message });
  }

  return Response.json({ success: true, data });
}