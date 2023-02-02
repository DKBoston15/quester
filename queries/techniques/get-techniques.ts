import { supabase } from '../../utils/supabase-client';

export const getTechniques = async () => {
  return supabase
    .from('techniques')
    .select(`*`)
    .order('created_at', { ascending: false });
};
