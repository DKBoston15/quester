import { supabase } from '../../utils/supabase-client';

export async function updateDarkModeSetting(
  id: number,
  darkMode: boolean,
  userId: string
) {
  return supabase
    .from('settings')
    .update({
      dark_mode: darkMode
    })
    .eq('user_id', userId)
    .eq('id', id);
}
