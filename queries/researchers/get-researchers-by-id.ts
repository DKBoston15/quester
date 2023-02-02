import { supabase } from '../../utils/supabase-client';

export const getResearchersById = async ({ projectItemId }: any) => {
  return supabase
    .from('researchers')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
