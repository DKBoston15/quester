import { supabase } from '../../utils/supabase-client';

export const getFigureById = async ({ id }: any) => {
  return supabase
    .from('figures')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
