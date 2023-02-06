import { supabase } from '../../utils/supabase-client';

export const getDocumentById = async ({ id }: any) => {
  return supabase
    .from('documents')
    .select(`*`)
    .eq('id', parseInt(id))
    .order('created_at', { ascending: false });
};
