import { supabase } from '../../utils/supabase-client';

export async function updateSample(
  id: number,
  title: string,
  link: string,
  design: string,
  technique: boolean,
  size: string,
  finalSample: string,
  powerAnalysis: string,
  startDate: string,
  endDate: string,
  userId: string
) {
  return supabase
    .from('samples')
    .update({
      title,
      technique,
      design,
      size,
      final_sample: finalSample,
      power_analysis: powerAnalysis,
      start_date: startDate,
      end_date: endDate,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
