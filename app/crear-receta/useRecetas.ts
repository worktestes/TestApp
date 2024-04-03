import { useQuery } from '@tanstack/react-query';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export function useRecetas() {
  const supabase = createClientComponentClient();

  const { data, error } = useQuery(['recetas'], async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    const { data: receta, error: recetaError } = await supabase
      .from('recetas')
      .select('*')
      .order('nombre_receta', { ascending: true });

    if (recetaError) {
      throw new Error('Error fetching recetas');
    }

    const { data: doctor, error: doctorError } = await supabase
      .from('doctores')
      .select('*')
      .eq('user_id', user?.id);

    if (doctorError) {
      throw new Error('Error fetching doctor');
    }

    return { receta, user, doctor };
  });

  return {
    receta: data?.receta,
    user: data?.user,
    doctor: data?.doctor,
    error: error ? error.message : null,
  };
}