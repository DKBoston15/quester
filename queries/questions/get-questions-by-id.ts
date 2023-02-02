import { supabase } from '../../utils/supabase-client';

export const getQuestionsById = async ({ projectItemId }: any) => {
  return supabase
    .from('questions')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
