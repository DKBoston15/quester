import { supabase } from '../../utils/supabase-client';

export const getModelById = async ({ id }: any) => {
  return supabase
    .from('models')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
