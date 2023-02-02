import { supabase } from '../../utils/supabase-client';

export async function createLab(
  title: string,
  link: string,
  equipment: string,
  instruments: boolean,
  products: string,
  patents: string,
  manager: string,
  email: string,
  phoneNumber: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('labs').insert([
    {
      title,
      link,
      equipment,
      instruments,
      products,
      patents,
      manager,
      email,
      phone_number: phoneNumber,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
