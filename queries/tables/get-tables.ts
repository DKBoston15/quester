import { supabase } from '../../utils/supabase-client';

export const getTables = async () => {
  return supabase
    .from('tables')
    .select(`*`)
    .order('created_at', { ascending: false });
};
