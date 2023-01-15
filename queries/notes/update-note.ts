import { supabase } from '../../utils/supabase-client';

export async function updateNote(id: number, body: string, userId: string) {
  return supabase
    .from('notes')
    .update({ body })
    .eq('user_id', userId)
    .eq('id', id);
}
