import { supabase } from '../../utils/supabase-client';

export async function updateDesign(
  id: number,
  title: string,
  link: string,
  technique: string,
  option: boolean,
  startDate: string,
  endDate: string,
  userId: string
) {
  return supabase
    .from('designs')
    .update({
      title,
      technique,
      option,
      start_date: startDate,
      end_date: endDate,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
