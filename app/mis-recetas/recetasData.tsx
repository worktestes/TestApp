import React from "react";


interface RecetasDataProps {
    receta: {
        id_receta: string;
        nombre_receta: string;
        descripcion_receta: string;
        dosis: string;
        fecha_creacion: string;
        proxima_revision: string;
        doctor_id: string
        paciente_id: string;
    }[];
}

export default function RecetasInfo({receta}: RecetasDataProps){
    return(
        <>
       {receta.map((recetas) => (
  <div key={recetas.id_receta} className="mb-6 p-4 bg-white rounded-lg shadow border border-gray-200">
    
    <h3 className="text-lg font-semibold text-gray-900 mb-2">Nombre: {recetas.nombre_receta}</h3>
    <p className="text-gray-700 mb-1">Descripción: {recetas.descripcion_receta}</p>
    <p className="text-gray-700 mb-1">Dosis: {recetas.dosis}</p>
    <p className="text-sm text-gray-600 mb-1">Fecha Creación: {recetas.fecha_creacion}</p>
    <p className="text-sm text-gray-600">Próxima Revisión: {recetas.proxima_revision}</p>
  </div>
))}


        </>
    )
}