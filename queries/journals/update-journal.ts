import { supabase } from '../../utils/supabase-client';

export async function updateJournal(
  id: number,
  title: string,
  link: string,
  impactScore: string,
  editor: boolean,
  association: string,
  publicationFreq: string,
  primary: boolean,
  userId: string
) {
  return supabase
    .from('journals')
    .update({
      title,
      impact_score: impactScore,
      editor,
      association,
      publication_freq: publicationFreq,
      primary,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
