import { supabase } from '../../utils/supabase-client';

export const getFiguresById = async ({ projectItemId }: any) => {
  return supabase
    .from('figures')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
