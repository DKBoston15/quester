import { supabase } from '../../utils/supabase-client';

export async function createDesign(
  title: string,
  technique: string,
  option: boolean,
  startDate: string,
  endDate: string,
  link: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('designs').insert([
    {
      title,
      technique,
      option,
      start_date: startDate,
      end_date: endDate,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
