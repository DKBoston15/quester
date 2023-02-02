import { supabase } from '../../utils/supabase-client';

export const getParadigms = async () => {
  return supabase
    .from('paradigms')
    .select(`*`)
    .order('created_at', { ascending: false });
};
