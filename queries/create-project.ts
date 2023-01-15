import { supabase } from '../utils/supabase-client';

export async function createProject(
  title: string,
  type: string,
  bgColorClass: string,
  pinned: boolean,
  userId: string
) {
  return supabase
    .from('projects')
    .insert([
      { title, type, bg_color_class: bgColorClass, pinned, user_id: userId }
    ]);
}
