import { supabase } from '../../utils/supabase-client';

export const getLabs = async () => {
  return supabase
    .from('labs')
    .select(`*`)
    .order('created_at', { ascending: false });
};
