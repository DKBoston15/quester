import { supabase } from '../../utils/supabase-client';

export async function createNote(
  body: string,
  projectItemId: number,
  userId: string,
  itemId?: number,
  itemType?: string
) {
  return supabase.from('notes').insert([
    {
      body,
      project_item_id: projectItemId,
      item_id: itemId,
      item_type: itemType,
      user_id: userId
    }
  ]);
}
