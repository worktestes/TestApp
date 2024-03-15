"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const router = useRouter();
  const [user,setUser] = useState()
    const [loading,setLoading] = useState(true)
  
  
  
  const supabase = createClientComponentClient();
    
useEffect(() => {
    async function getUser(){
        const {data:{user}} = await supabase.auth.getUser()
        setUser(user)
        setLoading(false)

    }
    getUser()
},[]) 

  const handleSignUp = async () => {
   const res=  await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: ``,
      },
    });
    setUser(res.data.user)
    router.refresh();
    setEmail('')
    setPassword('')
  };

  const handleSignIn = async () => {
 const res=   await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setUser(res.data.user)
    router.refresh();
    setEmail('')
    setPassword('')
  };

const handleLogout = async() => {
    await supabase.auth.signOut();
    router.refresh()
    setUser(null)
}

    console.log(loading, user);
if (loading) {
    <div className="flex items-center justify-center min-h-screen">
    <h1 className="text-2xl font-bold text-gray-800">Loading...</h1>
  </div>
}
if (user) {
    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">You are already logged in</h1>
          <div className="flex justify-center">
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Logout
            </button>
          </div>
        </div>
      </div>
    )
}
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Admin Users</h2>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSignUp}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>
            <button
              onClick={handleSignIn}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}