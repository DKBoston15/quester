import { supabase } from '../../utils/supabase-client';

export async function updateQuestion(
  id: number,
  title: string,
  link: string,
  questionOne: string,
  questionTwo: string,
  questionThree: string,
  questionFour: string,
  questionFive: string,
  questionSix: string,
  questionSeven: string,
  userId: string
) {
  return supabase
    .from('questions')
    .update({
      title,
      question_1: questionOne,
      question_2: questionTwo,
      question_3: questionThree,
      question_4: questionFour,
      question_5: questionFive,
      question_6: questionSix,
      question_7: questionSeven,
      link
    })
    .eq('user_id', userId)
    .eq('id', id);
}
