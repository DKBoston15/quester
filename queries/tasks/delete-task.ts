import { supabase } from '../../utils/supabase-client';

export async function deleteTask(id: number, userId: string) {
  return supabase.from('tasks').delete().eq('user_id', userId).eq('id', id);
}
