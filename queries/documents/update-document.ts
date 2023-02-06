import { supabase } from '../../utils/supabase-client';

export async function updateDocument(
  id: number,
  title: string,
  newData: any,
  userId: string
) {
  return supabase
    .from('documents')
    .update({
      title,
      data: newData
    })
    .eq('user_id', userId)
    .eq('id', parseInt(id));
}
