import { supabase } from '../../utils/supabase-client';

export const getModels = async () => {
  return supabase
    .from('models')
    .select(`*`)
    .order('created_at', { ascending: false });
};
