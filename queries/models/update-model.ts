import { supabase } from '../../utils/supabase-client';

export async function updateModel(
  id: number,
  title: string,
  link: string,
  type: string,
  userId: string
) {
  return supabase
    .from('models')
    .update({
      title,
      link,
      type
    })
    .eq('user_id', userId)
    .eq('id', id);
}
