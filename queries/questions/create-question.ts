import { supabase } from '../../utils/supabase-client';

export async function createQuestion(
  title: string,
  link: string,
  questionOne: string,
  questionTwo: string,
  questionThree: string,
  questionFour: string,
  questionFive: string,
  questionSix: string,
  questionSeven: string,
  projectItemId: number,
  userId: string
) {
  return supabase.from('questions').insert([
    {
      title,
      link,
      question_1: questionOne,
      question_2: questionTwo,
      question_3: questionThree,
      question_4: questionFour,
      question_5: questionFive,
      question_6: questionSix,
      question_7: questionSeven,
      project_item_id: projectItemId,
      user_id: userId
    }
  ]);
}
