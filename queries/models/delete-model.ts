import { supabase } from '../../utils/supabase-client';

export async function deleteModel(id: number, userId: string) {
  return supabase.from('models').delete().eq('user_id', userId).eq('id', id);
}
