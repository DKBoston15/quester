import { supabase } from '../../utils/supabase-client';

export async function createTechnique(
  title: string,
  link: string,
  method: string,
  technique: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('techniques').insert([
    {
      title,
      technique,
      method,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
