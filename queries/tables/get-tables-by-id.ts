import { supabase } from '../../utils/supabase-client';

export const getTablesById = async ({ projectItemId }: any) => {
  return supabase
    .from('tables')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
