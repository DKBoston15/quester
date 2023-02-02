import { supabase } from '../../utils/supabase-client';

export async function deleteKeyTerm(id: number, userId: string) {
  return supabase.from('key_terms').delete().eq('user_id', userId).eq('id', id);
}
