import { supabase } from '../../utils/supabase-client';

export const getTableById = async ({ id }: any) => {
  return supabase
    .from('tables')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
