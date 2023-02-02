import { supabase } from '../../utils/supabase-client';

export async function createTable(
  title: string,
  link: string,
  type: string,
  number: string,
  rowCount: number,
  columnCount: number,
  projectItemId: number,
  userId: string
) {
  return supabase.from('tables').insert([
    {
      title,
      link,
      type,
      number,
      row_count: rowCount,
      column_count: columnCount,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
