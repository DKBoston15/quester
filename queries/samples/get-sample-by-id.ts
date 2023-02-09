import { supabase } from '../../utils/supabase-client';

export const getSampleById = async ({ id }: any) => {
  return supabase
    .from('samples')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
