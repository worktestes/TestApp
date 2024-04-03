'use client'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { login, signup } from './action'
import { use, useEffect, useState } from 'react';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const [user,setUser] = useState()
  const [loading,setLoading] = useState(true)
  const [resetPassword, setResetPassword] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)

  const sendResetPassaword =  async () => {

  }
  return (
    <form>
    {!resetPassword && 
      <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">CREATE OR SIGN IN</h2>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                formAction={signup}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Sign Up
              </button>
              <button
                formAction={login}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
                
            </div>
          </div>
        </div>
      </main>
    }
    <div>
    {resetPassword &&
    <main  className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">FORGOT PASSWORD?</h2>
         <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                placeholder="Enter your email"
              />
            </div>
            {success && <div className="text-gray-700 ">Success! Check your email to reset your password</div>}
            <div className="flex items-center justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={sendResetPassaword}>
          Reset my password
        </button>
        </div>
        </div>
      </div>
      </main>
    }
    <p className="text-white cursor-pointer text-center hover:underline" onClick={() => setResetPassword(!resetPassword)}> 
      {resetPassword ? 'Login' : 'Reset my password'}
    </p>
  </div>
  </form>
  )
}