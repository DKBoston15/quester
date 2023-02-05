import { supabase } from '../../utils/supabase-client';

export const getAllOptions = async (userId: string) => {
  let { data, error } = await supabase.rpc('getalloptions', {
    userid: userId
  });
  return data;
};
