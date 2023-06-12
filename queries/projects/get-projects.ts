import { Project } from '@/utils/types';
import { supabase } from '../../utils/supabase-client';

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase.from('projects').select('*');

  if (error) {
    throw new Error(error.message);
  }

  return data as Project[];
};
