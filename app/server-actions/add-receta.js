'use server'
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function AddReceta(formData) {


  
  console.log(formData);
  const paciente = formData.get("paciente");
  const descripcion = formData.get("descripcion");
  const dosis = formData.get("dosis");
  const fecha = formData.get("fecha");
  const proximaRevision = formData.get("proximaRevision");
  const edadPaciente = formData.get("edadPaciente")
  const pesoPaciente = formData.get("pesoPaciente")
  // Generar un nuevo nombre para el archivo basado en timestamp



  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;


  const { data: pacientee } = await supabase
    .from("pacientes")
    .select("*")
    .eq("nombre_usuario", paciente);
    const pacienteId = pacientee?.data?.[0]?.id_paciente ?? null;
    const pacienteUserId = pacientee?.data?.[0]?.user_id ?? null;

  console.log("Paciente:", pacientee);
  
  const { data: doctors } = await supabase
    .from("doctores")
    .select("id_doctor")
    .eq("user_id", user?.id);
  
    const doctorId = doctors?.data?.[0]?.id_doctor ?? null;
  console.log("Doctors:", doctors);
  
  const { data, error } = await supabase.from("recetas").insert([
    {
      nombre_receta: paciente,
      descripcion_receta: descripcion,
      dosis: dosis,
      fecha_creacion: fecha,
      proxima_revision: proximaRevision,
      doctor_id: doctors?.[0]?.id_doctor,
      paciente_id: pacientee?.[0]?.id_paciente,
      edad_paciente: edadPaciente,
      peso_paciente: pesoPaciente,
      user_id_paciente: pacientee?.[0]?.user_id,
    },
  ]);
}
