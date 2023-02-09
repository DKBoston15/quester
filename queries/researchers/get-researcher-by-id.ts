import { supabase } from '../../utils/supabase-client';

export const getResearcherById = async ({ id }: any) => {
  return supabase
    .from('researchers')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
