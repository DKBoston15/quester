import { supabase } from '../../utils/supabase-client';

export async function createFigure(
  title: string,
  link: string,
  type: string,
  number: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('figures').insert([
    {
      title,
      type,
      number,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
