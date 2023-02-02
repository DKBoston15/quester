import { supabase } from '../../utils/supabase-client';

export async function updateTechnique(
  id: number,
  title: string,
  link: string,
  method: string,
  technique: string,
  userId: string
) {
  return supabase
    .from('techniques')
    .update({
      title,
      technique,
      method,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
