import { supabase } from '../../utils/supabase-client';

export const getArticles = async () => {
  return supabase
    .from('articles')
    .select(`*`)
    .order('created_at', { ascending: false });
};
