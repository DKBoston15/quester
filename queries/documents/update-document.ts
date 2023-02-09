import { supabase } from '../../utils/supabase-client';

export async function updateDocument(
  id: number,
  title: string,
  newData: any,
  projectItemId: string,
  userId: string
) {
  return supabase
    .from('documents')
    .update({
      title,
      data: newData,
      project_item_id: projectItemId
    })
    .eq('user_id', userId)
    .eq('id', parseInt(id));
}
