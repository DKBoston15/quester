import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { getURL } from '@/utils/helpers';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

import { AuthLayout } from '@/components/LandingPage/AuthLayout';
import LoadingDots from '@/components/LoadingDots';

export default function Login() {
  const router = useRouter();
  const user = useUser();
  const supabaseClient = useSupabaseClient();

  useEffect(() => {
    if (user) {
      router.replace('/app/projects');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign In - Quester</title>
      </Head>
      <AuthLayout>
        <div className="text-3xl text-black">Welcome</div>
        <p className="text-md text-gray-500 pt-2 pb-8">
          Sign in or Create your account below
        </p>
        {!user && (
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            redirectTo={getURL()}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              className: {
                message: 'text-black'
              },
              variables: {
                default: {
                  colors: {
                    brand: '#2381FE',
                    brandAccent: '#2381FE',
                    messageText: 'black'
                  }
                }
              }
            }}
          />
        )}
        {user && (
          <div className="m-6">
            <LoadingDots />
          </div>
        )}
      </AuthLayout>
    </>
  );
}
