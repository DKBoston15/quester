import { supabase } from '../../utils/supabase-client';

export const getJournals = async () => {
  return supabase
    .from('journals')
    .select(`*`)
    .order('created_at', { ascending: false });
};
