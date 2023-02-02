import { supabase } from '../../utils/supabase-client';

export async function deleteTechnique(id: number, userId: string) {
  return supabase
    .from('techniques')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);
}
