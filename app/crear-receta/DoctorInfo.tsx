import React from 'react';

interface DoctorInfoProps {
  doctor: {
    user_id: string;
    nombre_doctor: string;
    telefono_doctor: string;
    email_doctor: string;
    cedula_doctor: string;
  }[];
}

export default function DoctorInfo({ doctor }: DoctorInfoProps) {
  return (
    <>
      {doctor.map((doctores) => (
        <div key={doctores.user_id} className="mb-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <p className="text-lg font-bold mb-2 text-gray-800">{doctores.nombre_doctor}</p>
            <p className="text-sm text-gray-600 mb-1">Celular: {doctores.telefono_doctor}</p>
            <p className="text-sm text-gray-600 mb-1">Email: {doctores.email_doctor}</p>
            <p className="text-sm text-gray-600">Cédula: {doctores.cedula_doctor}</p>
          </div>
        </div>
      ))}
    </>
  );
}