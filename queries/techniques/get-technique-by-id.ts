import { supabase } from '../../utils/supabase-client';

export const getTechniqueById = async ({ id }: any) => {
  return supabase
    .from('techniques')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
