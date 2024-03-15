import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  
  if (code) {
    const cookieStore = cookies()
    const superbase = createRouteHandlerClient({cookies: () => cookieStore})
    await superbase.auth.exchangeCodeForSession(code)
  }



  return NextResponse.redirect(new URL('/test-page, req.url'))
}