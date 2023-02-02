import { supabase } from '../../utils/supabase-client';

export async function deleteConnection(id: number, userId: string) {
  return supabase
    .from('connections')
    .delete()
    .eq('user_id', userId)
    .eq('id', id);
}
