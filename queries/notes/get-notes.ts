import { supabase } from '../../utils/supabase-client';

export const getNotesById = async ({ projectItemId }: any) => {
  return supabase
    .from('notes')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
