import 'styles/main.css';
import 'styles/chrome-bug.css';
import '@/styles/tailwind.css';
import 'katex/dist/katex.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { AppProps } from 'next/app';
import { MyUserContextProvider } from 'utils/useUser';
import type { Database } from 'types_db';
import { SidebarProvider } from 'context/SidebarContext';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [initialContext, setInitialContext] = useState();
  const [supabaseClient] = useState(() =>
    createBrowserSupabaseClient<Database>()
  );
  useEffect(() => {
    document.body.classList?.remove('loading');
  }, []);

  const getUserDetails = async () =>
    supabaseClient.from('users').select('*').single();
  const getSubscription = async () =>
    supabaseClient
      .from('subscriptions')
      .select('*, prices(*, products(*))')
      .in('status', ['trialing', 'active'])
      .single();

  const getInitialData = async () => {
    const userDetails = await getUserDetails();
    const subscription = await getSubscription();
    setInitialContext({
      //@ts-ignore
      userDetails: userDetails.data,
      subscription: subscription.data
    });
  };

  useEffect(() => {
    getInitialData();
  }, []);

  return (
    <SessionContextProvider supabaseClient={supabaseClient}>
      <MyUserContextProvider initial={initialContext}>
        <SidebarProvider>
          <Component {...pageProps} />
        </SidebarProvider>
      </MyUserContextProvider>
    </SessionContextProvider>
  );
}
