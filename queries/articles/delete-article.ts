import { supabase } from '../../utils/supabase-client';

export async function deleteArticle(id: number, userId: string) {
  return supabase.from('articles').delete().eq('user_id', userId).eq('id', id);
}
