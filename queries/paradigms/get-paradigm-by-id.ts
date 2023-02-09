import { supabase } from '../../utils/supabase-client';

export const getParadigmById = async ({ id }: any) => {
  return supabase
    .from('paradigms')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
