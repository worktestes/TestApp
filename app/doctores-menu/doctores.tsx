import React, { useEffect, useState } from 'react'
import DoctorDataProps from "./DoctorData"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import DoctorInfo from './DoctorData';

export default function DoctoresMenu()  {
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => { 
    const fetchData = async () => {
      const supabase = createClientComponentClient();

      const { 
        data:{session},
      } = await supabase.auth.getSession()
      const user = session?.user;
      setUser(user);

 const { data: doctor, error: doctorError } = await supabase
        .from('doctores')
        .select('*')
        

      if (doctorError) {
        setError('Error fetching doctor');
        return;
      }
      setDoctor(doctor);
    };
    fetchData()
  }, [])
  if (error) {
    return <div>Error: {error} </div>
  }
  
  return (
    <div>
      
      {doctor && <DoctorInfo doctor={doctor} />}
      
    </div>
  )
}


