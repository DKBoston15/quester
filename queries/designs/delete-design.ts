import { supabase } from '../../utils/supabase-client';

export async function deleteDesign(id: number, userId: string) {
  return supabase.from('designs').delete().eq('user_id', userId).eq('id', id);
}
