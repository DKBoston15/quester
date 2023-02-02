import { supabase } from '../../utils/supabase-client';

export async function deleteTable(id: number, userId: string) {
  return supabase.from('tables').delete().eq('user_id', userId).eq('id', id);
}
