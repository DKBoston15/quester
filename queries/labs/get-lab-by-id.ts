import { supabase } from '../../utils/supabase-client';

export const getLabById = async ({ id }: any) => {
  return supabase
    .from('labs')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
