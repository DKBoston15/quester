import { supabase } from '../../utils/supabase-client';

export const getAllOptions = async (userId: string) => {
  //@ts-ignore
  let { data, error } = await supabase.rpc('getalloptions', {
    userid: userId
  });
  return data;
};
