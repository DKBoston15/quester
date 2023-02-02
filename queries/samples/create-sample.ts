import { supabase } from '../../utils/supabase-client';

export async function createSample(
  title: string,
  link: string,
  design: string,
  technique: boolean,
  size: string,
  finalSample: string,
  powerAnalysis: string,
  startDate: string,
  endDate: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('samples').insert([
    {
      title,
      technique,
      design,
      size,
      final_sample: finalSample,
      power_analysis: powerAnalysis,
      start_date: startDate,
      end_date: endDate,
      link,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
