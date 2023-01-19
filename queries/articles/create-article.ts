import { supabase } from '../../utils/supabase-client';

export async function createArticle(
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
  projectItemId: number,
  userId: string
) {
  console.log(projectItemId);
  return supabase.from('articles').insert([
    {
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
      read,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
