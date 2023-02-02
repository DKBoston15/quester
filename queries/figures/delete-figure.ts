import { supabase } from '../../utils/supabase-client';

export async function deleteFigure(id: number, userId: string) {
  return supabase.from('figures').delete().eq('user_id', userId).eq('id', id);
}
