import { supabase } from '../../utils/supabase-client';

export async function updateFigure(
  id: number,
  title: string,
  type: string,
  number: string,
  link: string,
  userId: string
) {
  return supabase
    .from('figures')
    .update({
      title,
      type,
      number,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
