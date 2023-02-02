import { supabase } from '../../utils/supabase-client';

export const getDesigns = async () => {
  return supabase
    .from('designs')
    .select(`*`)
    .order('created_at', { ascending: false });
};
