import { supabase } from '../../utils/supabase-client';

export const getJournalById = async ({ id }: any) => {
  return supabase
    .from('journals')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
