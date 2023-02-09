import { supabase } from '../../utils/supabase-client';

export async function updateDesign(
  id: number,
  title: string,
  technique: string,
  startDate: string,
  endDate: string,
  link: string,
  userId: string
) {
  return supabase
    .from('designs')
    .update({
      title,
      technique,
      start_date: startDate,
      end_date: endDate,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
