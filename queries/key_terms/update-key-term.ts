import { supabase } from '../../utils/supabase-client';

export async function updateKeyTerm(
  id: number,
  title: string,
  link: string,
  googleScholarLabel: string,
  userId: string
) {
  return supabase
    .from('key_terms')
    .update({
      title,
      link,
      google_scholar_label: googleScholarLabel
    })
    .eq('user_id', userId)
    .eq('id', id);
}
