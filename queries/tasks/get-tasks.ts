import { supabase } from '../../utils/supabase-client';

export const getTasks = async ({ projectItemId }: any) => {
  return supabase
    .from('tasks')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
