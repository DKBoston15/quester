import { supabase } from '../../utils/supabase-client';

export const getKeyTermById = async ({ id }: any) => {
  return supabase
    .from('key_terms')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
