import { supabase } from '../../utils/supabase-client';

export async function updateKeyTerm(
  id: number,
  title: string,
  link: string,
  citations: string,
  keyLiterature: string,
  authors: string,
  primary: boolean,
  userId: string
) {
  return supabase
    .from('key_terms')
    .update({
      title,
      citations,
      key_literature: keyLiterature,
      authors,
      primary,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
