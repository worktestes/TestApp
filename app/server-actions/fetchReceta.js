'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function fetchRecipis() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: receta, error } = await supabase
    .from("recetas")
    .select("*")
    

  if (error) {
    console.error("Error fetching recipis");
    return { error: "Error fetching recipis" };
  }

  return { receta, user };
}