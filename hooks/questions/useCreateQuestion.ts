import { useUser } from '@/utils/useUser';
import { createQuestion } from 'queries/questions/create-question';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateQuestion = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      questionOne,
      questionTwo,
      questionThree,
      questionFour,
      questionFive,
      questionSix,
      questionSeven,
      projectItemId
    }: any) => {
      return createQuestion(
        title,
        link,
        questionOne,
        questionTwo,
        questionThree,
        questionFour,
        questionFive,
        questionSix,
        questionSeven,
        projectItemId,
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
