import { supabase } from '../../utils/supabase-client';

export async function updateArticle(
  id: number,
  title: string,
  researchParadigm: string,
  samplingDesign: string,
  samplingTechnique: string,
  analyticDesign: string,
  researchDesign: string,
  authors: string[],
  year: string,
  journal: string,
  volume: string,
  issue: string,
  startPage: string,
  endPage: string,
  link: string,
  literatureType: string,
  read: boolean,
  userId: string
) {
  return supabase
    .from('articles')
    .update({
      title,
      research_paradigm: researchParadigm,
      sampling_design: samplingDesign,
      sampling_technique: samplingTechnique,
      analytic_design: analyticDesign,
      research_design: researchDesign,
      authors,
      year,
      journal,
      volume,
      issue,
      start_page: startPage,
      end_page: endPage,
      link,
      literature_type: literatureType,
      read
    })
    .eq('user_id', userId)
    .eq('id', id);
}
