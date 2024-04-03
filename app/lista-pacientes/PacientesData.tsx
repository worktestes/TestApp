import React from 'react';
import Image from 'next/image';

const avatarUrl = "https://yrjckqyqybppxxcwpbgy.supabase.co/storage/v1/object/public/avatars/"
interface PacientesDataProps {
  paciente: {
    id_paciente: string;
    nombre_usuario: string;
    apellido_usuario: string;
    fecha_nacimiento: string;
    email_usuario: string;
    notifications: string;
    avatar_url: string;
  }[];
}

export default function PacienteInfo({ paciente }: PacientesDataProps) {
  return (
    <>
     {paciente.map((pacientes) => (
    <div key={pacientes.id_paciente} className="mb-8">
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <Image
            src={`${avatarUrl}/${encodeURIComponent(pacientes.avatar_url)}`}
            alt="avatarDoctor"
            className="w-16 h-16 rounded-full object-cover"
            width={64} 
            height={64}
          />
          <div>
            <p className="text-xl font-semibold mb-1 text-gray-900">{pacientes.nombre_usuario} {pacientes.apellido_usuario}</p>
            <p className="text-sm text-gray-500">fecha de nacimiento: {pacientes.fecha_nacimiento}</p>
            <p className="text-sm text-gray-500">Email: {pacientes.email_usuario}</p>
            <p className="text-sm text-gray-500">notificaciones: {pacientes.notifications}</p>
          </div>
        </div>
      </div>
    </div>
     ))}
    </>
  );
}