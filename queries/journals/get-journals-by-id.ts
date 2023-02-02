import { supabase } from '../../utils/supabase-client';

export const getJournalsById = async ({ projectItemId }: any) => {
  return supabase
    .from('journals')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
