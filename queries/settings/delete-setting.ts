import { supabase } from '../../utils/supabase-client';

export async function deleteSetting(id: number, userId: string) {
  return supabase.from('settings').delete().eq('user_id', userId).eq('id', id);
}
