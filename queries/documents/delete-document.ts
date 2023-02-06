import { supabase } from '../../utils/supabase-client';

export async function deleteDocument(id: number, userId: string) {
  return supabase.from('documents').delete().eq('user_id', userId).eq('id', id);
}
