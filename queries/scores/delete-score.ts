import { supabase } from '../../utils/supabase-client';

export async function deleteScore(id: number, userId: string) {
  return supabase.from('scores').delete().eq('user_id', userId).eq('id', id);
}
