import { supabase } from '../../utils/supabase-client';

export const getDocuments = async () => {
  return supabase
    .from('documents')
    .select(`*`)
    .order('created_at', { ascending: false });
};
