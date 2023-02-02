import { supabase } from '../../utils/supabase-client';

export const getKeyTerms = async () => {
  return supabase
    .from('key_terms')
    .select(`*`)
    .order('created_at', { ascending: false });
};
