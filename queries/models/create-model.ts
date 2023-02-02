import { supabase } from '../../utils/supabase-client';

export async function createModel(
  title: string,
  link: string,
  type: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('models').insert([
    {
      title,
      type,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
