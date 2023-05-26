import { supabase } from '../../utils/supabase-client';

export const getSettingById = async ({ id }: any) => {
  return supabase
    .from('settings')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
