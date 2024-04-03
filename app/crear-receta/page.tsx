// app/crear-receta/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import DoctorInfo from './DoctorInfo';
import RecetaForm from './RecetaForm';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function CrearReceta() {
  const [receta, setReceta] = useState(null);
  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
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
        .select('*')
        .order('nombre_receta', { ascending: true });

      if (recetaError) {
        setError('Error fetching recetas');
        return;
      }
      setReceta(receta);
      console.log(receta);
      
      const { data: doctor, error: doctorError } = await supabase
        .from('doctores')
        .select('user_id, nombre_doctor, telefono_doctor, email_doctor, cedula_doctor')
        .eq('user_id', user?.id);

      if (doctorError) {
        setError('Error fetching doctor');
        return;
      }
      setDoctor(doctor);
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Crear Receta</h2>
        {doctor && <DoctorInfo doctor={doctor} />}
        <RecetaForm />
      </div>
    </div>
  );
}

// app/crear-receta/DoctorInfo.tsx
// ... (no changes)

// app/crear-receta/RecetaForm.tsx
// ... (no changes)