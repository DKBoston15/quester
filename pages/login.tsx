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
      router.replace('/account');
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>Sign In - TaxPal</title>
      </Head>
      <AuthLayout>
        {!user && (
          <Auth
            supabaseClient={supabaseClient}
            providers={['google']}
            redirectTo={getURL()}
            magicLink={true}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#404040',
                    brandAccent: '#52525b'
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
