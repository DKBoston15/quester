import { supabase } from '../../utils/supabase-client';

export async function deleteResearcher(id: number, userId: string) {
  return supabase
    .from('researchers')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);
}
