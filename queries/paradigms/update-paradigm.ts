import { supabase } from '../../utils/supabase-client';

export async function updateParadigm(
  id: number,
  title: string,
  link: string,
  category: string,
  userId: string
) {
  return supabase
    .from('paradigms')
    .update({
      title,
      category,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
