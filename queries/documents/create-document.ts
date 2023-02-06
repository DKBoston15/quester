import { supabase } from '../../utils/supabase-client';

export async function createDocument(
  title: string,
  data: any,
  projectItemId: number,
  userId: string
) {
  return supabase
    .from('documents')
    .insert([
      {
        title,
        data,
        project_item_id: projectItemId,
        user_id: userId
      }
    ])
    .select();
}
