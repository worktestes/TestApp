'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function fetchRecetas() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  const { data: doctor, error } = await supabase
    .from("doctores")
    .select("*")
    .order("nombre_receta", { ascending: true });

  if (error) {
    console.error("Error fetching recipis");
    return { error: "Error fetching recipis" };
  }
 
  


  return {  user, doctor };
}
