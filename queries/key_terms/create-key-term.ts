import { supabase } from '../../utils/supabase-client';

export async function createKeyTerm(
  title: string,
  link: string,
  citations: string,
  keyLiterature: string,
  authors: string,
  primary: boolean,
  projectItemId: number,
  userId: string
) {
  return supabase.from('key_terms').insert([
    {
      title,
      citations,
      key_literature: keyLiterature,
      authors,
      primary,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
