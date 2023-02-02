import { supabase } from '../../utils/supabase-client';

export const getSamplesById = async ({ projectItemId }: any) => {
  return supabase
    .from('samples')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
