import { supabase } from '../../utils/supabase-client';

export const getScoreById = async ({ scoreId }: any) => {
  return supabase
    .from('scores')
    .select(`*`)
    .eq('score_id', parseInt(scoreId))
    .order('created_at', { ascending: false });
};
