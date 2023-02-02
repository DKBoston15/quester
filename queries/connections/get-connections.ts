import { supabase } from '../../utils/supabase-client';

export const getConnectionsById = async ({
  projectItemId,
  itemId,
  itemType,
  connectedItemType
}: any) => {
  return supabase
    .from('connections')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .eq('item_id', parseInt(itemId))
    .eq('item_type', itemType)
    .eq('connected_item_type', connectedItemType)
    .order('created_at', { ascending: false });
};
