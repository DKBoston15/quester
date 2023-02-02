import { supabase } from '../../utils/supabase-client';

export const getLabsById = async ({ projectItemId }: any) => {
  return supabase
    .from('labs')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
