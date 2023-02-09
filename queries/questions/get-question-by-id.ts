import { supabase } from '../../utils/supabase-client';

export const getQuestionById = async ({ id }: any) => {
  return supabase
    .from('questions')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
