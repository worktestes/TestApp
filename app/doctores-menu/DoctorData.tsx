import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';
const avatarUrl = "https://yrjckqyqybppxxcwpbgy.supabase.co/storage/v1/object/public/doctorAvatar/"
interface DoctorDataProps {
  doctor: {
    id_doctor: string;
    nombre_doctor: string;
    especialidad_doctor: string;
    telefono_doctor: string;
    email_doctor: string;
    cedula_doctor: string;
    descripcion_doctor: string;
    avatar_url: string;
  }[];

}interface RecetasDataProps {
  receta: {
    id_receta: string;
    nombre_receta: string;
    descripcion_receta: string;
    dosis: string;
    fecha_creacion: string;
    proxima_revision: string;
    doctor_id: string;
    paciente_id: string;
  }[];
}

export function RecetasAdmin({ doctor_id }: { doctor_id: string }) {
  const [recetaState, setRecetaState] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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
        .eq('doctor_id', doctor_id);

      console.log(user);

      if (recetaError) {
        setError('Error fetching receta');
        return;
      }

      setRecetaState(receta);
    };

    fetchData();
  }, [doctor_id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {recetaState?.map((recetas: any) => (
        <div
          key={recetas.id_receta}
          className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nombre: {recetas.nombre_receta}
          </h3>
          <p className="text-gray-700 mb-1">
            Descripción: {recetas.descripcion_receta}
          </p>
          <p className="text-gray-700 mb-1">Dosis: {recetas.dosis}</p>
          <p className="text-sm text-gray-600 mb-1">
            Fecha Creación: {recetas.fecha_creacion}
          </p>
          <p className="text-sm text-gray-600">
            Próxima Revisión: {recetas.proxima_revision}
          </p>
        </div>
      ))}
    </>
  )
}
export default function DoctorInfo({ doctor }: DoctorDataProps) {
  const [componentToShow, setComponentToShow] = useState(null);
  const [error, setError] = useState(true)
  const [admin, setAdmin] = useState(true)
  const [user, setUser] = useState(true)

  const handleComponentChange = (componentName) => {
    setComponentToShow(componentName);
  };
  useEffect(() => {

    const fetchData = async () => {
      const supabase = createClientComponentClient();
    

      const {
        data: { session },
      } = await supabase.auth.getSession()
      const user = session?.user;
      setUser(user);

      console.log(user);

      const { data: admin, error: adminError } = await supabase
      .from('administradores')
      .select('user_id')
      .eq('user_id', user?.id);



    if (adminError) {
      setError('Error fetching admin');
      return;
    }
    setAdmin(admin);
    console.log(admin);
    };
    fetchData()
  }, [])
  return (
    <>
    {doctor.map((doctores) => (
      <div key={doctores.id_doctor} className="mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <div className="flex items-center space-x-4 mb-4">
            <Image
              src={`${avatarUrl}/${encodeURIComponent(doctores.avatar_url)}`}
              alt="avatarDoctor"
              className="w-16 h-16 rounded-full object-cover"
              width={64}
              height={64}
            />
            <div>
              <p className="text-xl font-semibold mb-1 text-gray-900">{doctores.nombre_doctor}</p>
              <p className="text-sm text-gray-500">Telefono: {doctores.telefono_doctor}</p>
              <p className="text-sm text-gray-500">Email: {doctores.email_doctor}</p>
            </div>
          </div>
          <p className="text-sm text-gray-600">Descripcion: {doctores.descripcion_doctor}</p>
          {user && (admin?.length > 0 ? admin.some(adm => adm.user_id === user.id) : false)  && (
                  <button onClick={() => handleComponentChange(`RecetasAdmin_${doctores.id_doctor}`)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Ver Recetas
          </button>
          )}
            {componentToShow === `RecetasAdmin_${doctores.id_doctor}` && <RecetasAdmin doctor_id={doctores.id_doctor} />}
        </div>
      </div>
    ))}
  </>
  
  );
}