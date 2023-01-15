import { supabase } from '../utils/supabase-client';

export async function updateProject(
  id: number,
  title: string,
  type: string,
  bgColorClass: string,
  pinned: boolean,
  userId: string
) {
  return supabase
    .from('projects')
    .update({ title, type, bg_color_class: bgColorClass, pinned })
    .eq('user_id', userId)
    .eq('id', id);
}
