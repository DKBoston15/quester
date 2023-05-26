import { supabase } from '../../utils/supabase-client';

export async function createSetting(
  fieldOfStudy: string,
  inGraduateSchool: boolean,
  participatingInCoursework: boolean,
  degreeSeeking: boolean,
  university: string,
  status: string,
  conductingResearch: boolean,
  writingProposal: boolean,
  writingDissertation: boolean,
  attendingConferences: boolean,
  lookingForPositions: boolean,
  darkMode: boolean,
  userId: string
) {
  return supabase.from('settings').insert([
    {
      field_of_study: fieldOfStudy,
      in_graduate_school: inGraduateSchool,
      participating_in_coursework: participatingInCoursework,
      degree_seeking: degreeSeeking,
      university: university,
      status: status,
      conducting_research: conductingResearch,
      writing_proposal: writingProposal,
      writing_dissertation: writingDissertation,
      attending_conferences: attendingConferences,
      looking_for_positions: lookingForPositions,
      dark_mode: darkMode,
      user_id: userId
    }
  ]);
}
