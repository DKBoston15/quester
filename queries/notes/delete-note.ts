import { supabase } from '../../utils/supabase-client';

export async function deleteNote(id: number, userId: string) {
  return supabase.from('notes').delete().eq('user_id', userId).eq('id', id);
}
