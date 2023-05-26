import { supabase } from '../../utils/supabase-client';

export const getSettings = async () => {
  return supabase
    .from('settings')
    .select(`*`)
    .order('created_at', { ascending: false });
};
