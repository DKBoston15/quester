import { supabase } from '../../utils/supabase-client';

export const getArticlesById = async ({ projectItemId }: any) => {
  return supabase
    .from('articles')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
