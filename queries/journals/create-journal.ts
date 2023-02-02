import { supabase } from '../../utils/supabase-client';

export async function createJournal(
  title: string,
  link: string,
  impactScore: string,
  editor: boolean,
  association: string,
  publicationFreq: string,
  keyLiterature: string,
  primary: boolean,
  projectItemId: number,
  userId: string
) {
  return supabase.from('journals').insert([
    {
      title,
      impact_score: impactScore,
      editor,
      association,
      publication_freq: publicationFreq,
      link,
      key_literature: keyLiterature,
      primary,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
