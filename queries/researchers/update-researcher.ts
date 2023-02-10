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
  projectRole: string,
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
      project_role: projectRole
    })
    .eq('user_id', userId)
    .eq('id', id);
}
