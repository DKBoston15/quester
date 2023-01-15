import { checklists } from 'constants/checklists';
import { supabase } from '../../utils/supabase-client';

function findByName(arr: any[], name: string): any | undefined {
  return arr.find((entry) => entry.name === name);
}

export async function createProject(
  title: string,
  type: string,
  bgColorClass: string,
  pinned: boolean,
  userId: string
) {
  const checklist = findByName(checklists, type);

  return supabase.from('projects').insert([
    {
      title,
      type,
      bg_color_class: bgColorClass,
      pinned,
      checklist: checklist.checklist,
      user_id: userId
    }
  ]);
}
