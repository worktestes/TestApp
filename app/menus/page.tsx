'use client'
import React, { useEffect, useState } from "react";
import { fetchRecetas } from "../server-actions/menus";
import DoctoresMenu from "../doctores-menu/doctores"
import CrearReceta from "../crear-receta/page";
import RecetasMenu from "../mis-recetas/page"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import PacientesMenu from "../lista-pacientes/pacientes"
import { userAgent } from "next/server";
export default function Page() {

  const [componentToShow, setComponentToShow] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(true)
  const [doctor, setDoctor] = useState(true)
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


      const { data: doctor, error: DoctorError } = await supabase
        .from('doctores')
        .select('user_id')
        .eq('user_id', user?.id);



      if (DoctorError) {
        setError('Error fetching doctor');
        return;
      }
      setDoctor(doctor);
      console.log(doctor);

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
    <main className="min-h-screen bg-gray-100 p-8">
      <nav className="bg-white shadow-lg rounded-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4 px-2">
                  <span className="font-semibold text-gray-500 text-lg">
                    pruebas
                  </span>
                </a>
              </div>

              <div className="hidden md:flex items-center space-x-1">

                <a
                  href="#"
                  className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold "
                  onClick={() => handleComponentChange('Recetas')}

                >
                  Mis Recetas
                </a>



                <a
                  href="#"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                  onClick={() => handleComponentChange('Doctores')}

                >
                  Nuestros Doctores
                </a>




                {user && (doctor?.length > 0 ? doctor.some(doc => doc.user_id === user.id) : false)  &&  (
              
                <a
                  href="#"
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300"
                  onClick={() => handleComponentChange('Lista')}

                >
                  Lista de pacientes (Solo doctores)
                </a>

              )}

              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3 ">
            {user && (doctor?.length > 0 ? doctor.some(doc => doc.user_id === user.id) : false)  &&  (

              <a
                href="#"
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
                onClick={() => handleComponentChange('CrearReceta')}

              >

                CREAR RECETA
              </a>
            )}
              <a
                href="#"
                className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300"
              >
                Botones
              </a>
              <a
              
                href="#"
                className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
              >
                Prueba
              </a>
            </div>

            <div className="md:hidden flex items-center">
              <button className="outline-none mobile-menu-button">
                <svg
                  className=" w-6 h-6 text-gray-500 hover:text-green-500 "
                  x-show="!showMenu"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 6h16M4 12h16m-7 6h7"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>
      <div>{user && (doctor?.length > 0 ? doctor.some(doc => doc.user_id === user.id) : false)  && (
        <h1 className="text-3xl font-bold text-green-600">DOCTOR</h1>
      )}
      {user && (admin?.length > 0 ? admin.some(adm => adm.user_id === user.id) : false)  && (
        <h1 className="text-3xl font-bold text-green-600">ADMIN</h1>
      )}
        
        {componentToShow === 'Doctores' && <DoctoresMenu />}
        {componentToShow === 'Recetas' && <RecetasMenu />}
        {componentToShow === 'Lista' && <PacientesMenu />}
        {componentToShow === 'CrearReceta' && <CrearReceta />}

      </div>
    </main>
  );
};


