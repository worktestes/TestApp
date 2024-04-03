'use client'
import React, { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import RecetasInfo from './recetasData';
import RecetasDataProps from './recetasData'

export default function RecetasMenu() {
  const [receta, setReceta] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient();

      const {
        data: { session },
      } = await supabase.auth.getSession();
      const user = session?.user;
      setUser(user);
    
      
      const { data: receta, error: recetaError } = await supabase
         .from('recetas')
        .select(`* , pacientes!inner(*)`)
        .eq('pacientes.user_id', user?.id)


        console.log(user);
        
      if (recetaError) {
        setError('Error fetching receta');
        return;
      }
      setReceta(receta);
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return(
    <div>
       {receta && <RecetasInfo receta={receta} />}
    </div>
  )
}
