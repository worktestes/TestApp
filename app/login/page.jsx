"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Userspage from "./users.jsx"
import DoctorsPage from "./doctors.jsx"
import AdminPage from "./admin.jsx"
export default function LoginPage() {

  return(
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
    <div className="flex flex-col">
    <Userspage />
    <DoctorsPage />
    <AdminPage />
    </div>
    </main>
  )
} 