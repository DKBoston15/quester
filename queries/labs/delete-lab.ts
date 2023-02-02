import { supabase } from '../../utils/supabase-client';

export async function deleteLab(id: number, userId: string) {
  return supabase.from('labs').delete().eq('user_id', userId).eq('id', id);
}
