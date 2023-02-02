import { supabase } from '../../utils/supabase-client';

export async function deleteQuestion(id: number, userId: string) {
  return supabase.from('questions').delete().eq('user_id', userId).eq('id', id);
}
