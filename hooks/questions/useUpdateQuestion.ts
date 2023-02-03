import { useUser } from '@/utils/useUser';
import { updateQuestion } from 'queries/questions/update-question';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateQuestion = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
      title,
      link,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      questionFive,
      questionSix,
      questionSeven
    }: any) => {
      return updateQuestion(
        id,
        title,
        link,
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        questionFive,
        questionSix,
        questionSeven,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
      }
    }
  );
};
