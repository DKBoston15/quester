import { supabase } from '../../utils/supabase-client';

export const getSamples = async () => {
  return supabase
    .from('samples')
    .select(`*`)
    .order('created_at', { ascending: false });
};
