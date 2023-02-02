import { supabase } from '../../utils/supabase-client';

export async function createParadigm(
  title: string,
  link: string,
  category: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('paradigms').insert([
    {
      title,
      category,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
