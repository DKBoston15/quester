import { withPageAuth } from '@supabase/auth-helpers-nextjs';
import React from 'react';

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });

export default function home() {
  return <div>home</div>;
}
