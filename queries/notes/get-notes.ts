import { supabase } from '../../utils/supabase-client';

export const getNotesById = async ({
  projectItemId,
  itemId,
  itemType
}: any) => {
  return supabase
    .from('notes')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .eq('item_id', parseInt(itemId))
    .eq('item_type', itemType)
    .order('created_at', { ascending: false });
};
