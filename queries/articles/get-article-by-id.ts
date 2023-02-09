import { supabase } from '../../utils/supabase-client';

export const getArticleById = async ({ id }: any) => {
  return supabase
    .from('articles')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
