import { supabase } from '../../utils/supabase-client';

export async function createResearcher(
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
  projectItemId: number,
  userId: string
) {
  return supabase.from('researchers').insert([
    {
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
      cv_link: cvLink,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
