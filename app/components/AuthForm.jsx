'use client'
import { Auth } from '@supabase/auth-ui-react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ThemeSupa } from '@supabase/auth-ui-shared';
export default function AuthForm() {
    const supabase = createClientComponentClient();
    return (
        <Auth
            supabaseClient={supabase}
            view="magic_link"
            showLinks={false}
            providers={['google', 'facebook', 'twitter']}
            redirectTo='http://localhost:3000/auth/callback'
            appearance={{
                 theme: ThemeSupa,
                
                
            }}
        />
    );
}