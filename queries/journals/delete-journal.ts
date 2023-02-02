import { supabase } from '../../utils/supabase-client';

export async function deleteJournal(id: number, userId: string) {
  return supabase.from('journals').delete().eq('user_id', userId).eq('id', id);
}
