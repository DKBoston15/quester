import { supabase } from '../../utils/supabase-client';

export const getProjects = async () => {
  return supabase.from('projects').select(`*`);
};
