import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React, { useEffect, useState } from 'react';
import Select from "react-select"
import {AddReceta} from "../server-actions/add-receta"

export default function RecetaForm() {
  const [suppliers, setSuppliers] = useState([]);
  useEffect(() => {
    const fetchSuppliers = async () => {
      const supabase = createClientComponentClient();
      const { data: suppliersData, error } = await supabase
        .from('pacientes')
        .select('id_paciente, nombre_usuario');
  
      if (error) {
        console.error('Error fetching suppliers:', error);
        return;
      }
  
      if (suppliersData) {
        const mappedSuppliers = suppliersData.map((supplier) => ({
          label: supplier.nombre_usuario,
          value: supplier.nombre_usuario,
        }));
        setSuppliers(mappedSuppliers);
      }
    };
  
    fetchSuppliers();
  }, []);


  return (
    <form action={AddReceta} className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
     <div className="mb-4">
            <label htmlFor="nombre_receta" className="block text-gray-700 font-bold mb-2">
              Paciente
            </label>
            <div className='text-black-900'>
            <Select 
            options={suppliers}
            id='paciente'
            name='paciente'
            className='text-gray-800'
            />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="edadPaciente" className="block text-gray-700 font-bold mb-2">
              Edad
            </label>
            <input
              type="text"
              name='edadPaciente'
              id="edadPaciente"
              className="  text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pesoPaciente" className="block text-gray-700 font-bold mb-2">
              Peso
            </label>
            <input
              type="text"
              name='pesoPaciente'
              id="pesoPaciente"
              className="  text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="descripcion_receta" className="block text-gray-700 font-bold mb-2">
              Descripción de la Receta
            </label>
            <textarea
              id="descripcion"
              name='descripcion'
              className="w-full px-3 text-gray-800 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="dosis" className="block text-gray-700 font-bold mb-2">
              Dosis
            </label>
            <input
              type="text"
              name='dosis'
              id="dosis"
              className="  text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
          <label htmlFor="fecha_creacion" className="block text-gray-700 font-bold mb-2">
              Fecha de Creación
            </label>
            <input
              type="date"
              name='fecha'
              id="fecha"
              className="  text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
          <label htmlFor="fecha_creacion" className="block text-gray-700 font-bold mb-2">
              Próxima Revisión
            </label>
            <input
              type="date"
              name='proximaRevision'
              id="proximaRevision"
              className="  text-gray-800 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className=" text-black-800 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
            >
              Crear Receta
            </button>
          </div>
    </form>
  );
}