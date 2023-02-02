import { supabase } from '../../utils/supabase-client';

export async function updateTable(
  id: number,
  title: string,
  link: string,
  type: string,
  number: string,
  rowCount: number,
  columnCount: number,
  userId: string
) {
  return supabase
    .from('tables')
    .update({
      title,
      link,
      type,
      number,
      row_count: rowCount,
      column_count: columnCount
    })
    .eq('user_id', userId)
    .eq('id', id);
}
