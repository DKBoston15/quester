import { supabase } from '../../utils/supabase-client';

export const getDocumentsById = async ({ projectItemId }: any) => {
  return supabase
    .from('documents')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
