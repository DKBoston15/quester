import { supabase } from '../../utils/supabase-client';

export async function createNote(
  body: string,
  projectItemId: number,
  userId: string
) {
  return supabase
    .from('notes')
    .insert([{ body, project_item_id: projectItemId, user_id: userId }]);
}
