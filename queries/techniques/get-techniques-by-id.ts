import { supabase } from '../../utils/supabase-client';

export const getTechniquesById = async ({ projectItemId }: any) => {
  return supabase
    .from('techniques')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
