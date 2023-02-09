import { supabase } from '../../utils/supabase-client';

export const getDesignById = async ({ id }: any) => {
  return supabase
    .from('designs')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
