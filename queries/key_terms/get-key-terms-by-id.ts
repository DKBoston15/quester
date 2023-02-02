import { supabase } from '../../utils/supabase-client';

export const getKeyTermsById = async ({ projectItemId }: any) => {
  return supabase
    .from('key_terms')
    .select(`*`)
    .eq('project_item_id', parseInt(projectItemId))
    .order('created_at', { ascending: false });
};
