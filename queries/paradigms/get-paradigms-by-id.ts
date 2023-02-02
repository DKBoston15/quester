import { supabase } from '../../utils/supabase-client';

export const getParadigmsById = async ({ projectItemId }: any) => {
  return supabase
    .from('paradigms')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
