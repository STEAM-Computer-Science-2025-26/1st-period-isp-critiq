import 'dotenv/config'
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function test() {
  const { data, error } = await supabase
    .from("user_base")
    .select("*");

  console.log("DATA:", data);
  console.log("ERROR:", error);
}

test();