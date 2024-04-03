'use client'
import { useCallback, useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import { type User } from '@supabase/supabase-js'
import Avatar from './avatar' 
import Link from 'next/link'


export default function AccountForm({ user }: { user: User | null }) {
  const supabase = createClient()
  const [loading, setLoading] = useState(true)
  const [nombreUsuario, setNombreUsuario] = useState<string | null>(null)
  const [apellidoUsuario, setApellidoUsuario] = useState<string | null>(null)
  const [fechaNacimiento, setFechaNacimiento] = useState<string | null>(null)
  const [telefonoUsuario, setTelefonoUsuario] = useState<string | null>(null)
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [idPaciente, setIdPaciente] = useState<number | null>(null); // Asume que el ID es un número, ajusta según sea necesario


  const getProfile = useCallback(async () => {
    try {
      setLoading(true)

      const { data, error, status } = await supabase
        .from('pacientes')
        .select(`*`)
        .eq('user_id', user?.id)
        .single()

      if (error && status !== 406) {
        console.log(error)
        throw error
      }

      if (data) {
        setNombreUsuario(data.nombre_usuario)
        setApellidoUsuario(data.apellido_usuario)
        setFechaNacimiento(data.fecha_nacimiento)
        setAvatarUrl(data.avatar_url)
        setTelefonoUsuario(data.telefono_usuario)
        setIdPaciente(data.id_paciente)

      }
      
    } catch (error) {
      alert('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  useEffect(() => {
    getProfile()
  }, [user, getProfile])

  async function updateProfile({
    
    nombreUsuario,
    apellidoUsuario,
    fechaNacimiento,
    telefonoUsuario,
    avatarUrl,

  }: {
    nombreUsuario: string | null
    apellidoUsuario: string | null
    fechaNacimiento: string | null
    telefonoUsuario: string | null
    avatarUrl: string | null
  }) {
    try {
      setLoading(true)

      const { data: paciente, error } = await supabase.from('pacientes').upsert({
        
        nombre_usuario: nombreUsuario,
        apellido_usuario: apellidoUsuario,
        fecha_nacimiento: fechaNacimiento,
        avatar_url: avatarUrl,
        telefono_usuario: telefonoUsuario,
        email_usuario: user?.email,
        updated_at: new Date().toISOString(),
        user_id: user?.id
      })
      .match({id_paciente: idPaciente	})
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      alert('Error updating the data!')
    } finally {
      setLoading(false)
    }
   
  }

  return (
    <div className="form-widget bg-white shadow-lg rounded-lg p-8">
      {idPaciente ? (
        <div className=''>
      <div className='bg-blue-500 text-white p-8'>
  <h1 className='text-3xl font-bold'>BIENVENIDO</h1>
  <h2 className='text-xl font-semibold mt-4'>¿Desea continuar?</h2>
  <div className="mt-8">
  <form action="/auth/signout" method="post"> 
    <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded mr-4" type='submit'> Sign out </button>
</form>
<Link href={"/menus"}> 
    <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded" type='submit'>Continue</button>
    </Link>
  </div>
</div>


        </div>
      ) : (
        <div>
          <div className="form-widget">
            <Avatar
              uid={user?.id ?? null}
              url={avatarUrl}
              size={150}
              onUpload={(url) => {
                setAvatarUrl(url)
                updateProfile({ nombreUsuario, apellidoUsuario, fechaNacimiento, telefonoUsuario, avatarUrl: url })
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              id="email"
              type="text"
              value={user?.email}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-800"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="nombreUsuario" className="block text-gray-700 text-sm font-bold mb-2">
              Nombre 
            </label>
            <input
              id="nombreUsuario"
              type="text"
              value={nombreUsuario || ''}
              onChange={(e) => setNombreUsuario(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="apellidoUsuario" className="block text-gray-700 text-sm font-bold mb-2">
              Apellidos
            </label>
            <input
              id="apellidoUsuario"
              type="text"
              value={apellidoUsuario || ''}
              onChange={(e) => setApellidoUsuario(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="fechaNacimiento" className="block text-gray-700 text-sm font-bold mb-2">
              Fecha de nacimiento
            </label>
            <input
              id="fechaNacimiento"
              type="date"
              value={fechaNacimiento || ''}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="telefonoUsuario" className="block text-gray-700 text-sm font-bold mb-2">
              Numero Celular
            </label>
            <input
              id="telefonoUsuario"
              type="text"
              value={telefonoUsuario || ''}
              onChange={(e) => setTelefonoUsuario(e.target.value)}
              className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              onClick={() => updateProfile({ nombreUsuario, apellidoUsuario, fechaNacimiento, telefonoUsuario, avatarUrl })}
              disabled={loading}
            >
              {loading ? 'Loading ...' : 'Update'}
            </button>
          </div>
          <div>
            <form action="/auth/signout" method="post">
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" type="submit">
                Sign out
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
} 