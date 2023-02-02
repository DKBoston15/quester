import { supabase } from '../../utils/supabase-client';

export async function updateLab(
  id: number,
  title: string,
  link: string,
  equipment: string,
  instruments: boolean,
  products: string,
  patents: string,
  manager: string,
  email: string,
  phoneNumber: string,
  userId: string
) {
  return supabase
    .from('labs')
    .update({
      title,
      equipment,
      instruments,
      products,
      patents,
      manager,
      email,
      phone_number: phoneNumber,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
