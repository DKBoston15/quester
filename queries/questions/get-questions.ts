import { supabase } from '../../utils/supabase-client';

export const getQuestions = async () => {
  return supabase
    .from('questions')
    .select(`*`)
    .order('created_at', { ascending: false });
};
