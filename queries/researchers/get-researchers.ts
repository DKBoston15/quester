import { supabase } from '../../utils/supabase-client';

export const getResearchers = async () => {
  return supabase
    .from('researchers')
    .select(`*`)
    .order('created_at', { ascending: false });
};
