import { supabase } from '../../utils/supabase-client';

export async function updateTable(
  id: number,
  title: string,
  link: string,
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
      number,
      row_count: rowCount,
      column_count: columnCount
    })
    .eq('user_id', userId)
    .eq('id', id);
}
