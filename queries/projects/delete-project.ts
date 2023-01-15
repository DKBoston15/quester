import { supabase } from '../../utils/supabase-client';

export async function deleteProject(id: number, userId: string) {
  return supabase.from('projects').delete().eq('user_id', userId).eq('id', id);
}
