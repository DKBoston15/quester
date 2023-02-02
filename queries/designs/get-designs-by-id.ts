import { supabase } from '../../utils/supabase-client';

export const getDesignsById = async ({ projectItemId }: any) => {
  return supabase
    .from('designs')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
