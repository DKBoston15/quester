import { supabase } from '../../utils/supabase-client';

export async function updateTask(
  id: number,
  title: string,
  dueDate: string,
  status: string,
  urgency: boolean,
  userId: string
) {
  return supabase
    .from('tasks')
    .update([
      {
        title,
        due_date: dueDate,
        status,
        urgency
      }
    ])
    .eq('user_id', userId)
    .eq('id', id);
}
