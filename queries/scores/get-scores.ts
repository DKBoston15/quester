import { supabase } from '../../utils/supabase-client';

export const getScores = async () => {
  return supabase
    .from('scores')
    .select(`*`)
    .order('created_at', { ascending: false });
};
