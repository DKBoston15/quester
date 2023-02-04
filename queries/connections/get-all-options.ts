import { supabase } from '../../utils/supabase-client';

export const getAllOptions = async (userId: string) => {
  console.log(userId);
  let { data, error } = await supabase.rpc('getalloptions', {
    userid: userId
  });
  console.log(data);
  return data;
};
