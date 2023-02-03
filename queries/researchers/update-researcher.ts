import { supabase } from '../../utils/supabase-client';

export async function updateResearcher(
  id: number,
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  linkedin: string,
  website: string,
  university: string,
  role: string,
  link: string,
  professorialStatus: string,
  keyLiterature: string,
  projectRole: string,
  primary: boolean,
  cvLink: string,
  userId: string
) {
  return supabase
    .from('researchers')
    .update({
      first_name: firstName,
      last_name: lastName,
      email,
      phone,
      linkedin,
      website,
      university,
      role,
      link,
      professorial_status: professorialStatus,
      key_literature: keyLiterature,
      project_role: projectRole,
      primary,
      cv_link: cvLink
    })
    .eq('user_id', userId)
    .eq('id', id);
}
