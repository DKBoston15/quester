import { supabase } from '../../utils/supabase-client';

export async function deleteParadigm(id: number, userId: string) {
  return supabase.from('paradigms').delete().eq('user_id', userId).eq('id', id);
}
