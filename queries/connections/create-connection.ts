import { supabase } from '../../utils/supabase-client';

export async function createConnection(
  projectItemId: number,
  userId: string,
  itemId: number,
  itemType: string,
  connectedProjectItemId: number,
  connectedItemId: number,
  connectedItemType: string
) {
  return supabase.from('connections').insert([
    {
      project_item_id: projectItemId,
      item_id: itemId,
      item_type: itemType,
      connected_project_item_id: connectedProjectItemId,
      connected_item_id: connectedItemId,
      connected_item_type: connectedItemType,
      user_id: userId
    }
  ]);
}
