import { checklists } from 'constants/checklists';
import { supabase } from '../../utils/supabase-client';

export async function createTask(
  title: string,
  dueDate: string,
  status: string,
  urgency: boolean,
  projectItemId: number,
  userId: string
) {
  return supabase.from('tasks').insert([
    {
      title,
      due_date: dueDate,
      status,
      urgency,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
