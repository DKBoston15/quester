import { supabase } from '../../utils/supabase-client';

export async function deleteSample(id: number, userId: string) {
  return supabase.from('samples').delete().eq('user_id', userId).eq('id', id);
}
