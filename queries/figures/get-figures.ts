import { supabase } from '../../utils/supabase-client';

export const getFigures = async () => {
  return supabase
    .from('figures')
    .select(`*`)
    .order('created_at', { ascending: false });
};
