import React, { useEffect, useState } from 'react'
import PacientesDataProps from "./PacientesData"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import PacienteInfo from './PacientesData';

export default function PacientesMenu()  {
  const [user, setUser] = useState(null);
  const [paciente, setPaciente] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClientComponentClient();

      const { 
        data:{session},
      } = await supabase.auth.getSession()
      const user = session?.user;
      setUser(user);

 const { data: paciente, error: pacienteError } = await supabase
        .from('pacientes')
        .select('*')
        

      if (pacienteError) {
        setError('Error fetching doctor');
        return;
      }
      setPaciente(paciente);
    };
    fetchData()
  }, [])
  if (error) {
    return <div>Error: {error} </div>
  }
  
  return (
    <div>
      
      {paciente && <PacienteInfo paciente={paciente} />}
     
    </div>
  )
}


