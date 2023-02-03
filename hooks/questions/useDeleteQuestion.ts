import { useUser } from '@/utils/useUser';
import { deleteQuestion } from 'queries/questions/delete-question';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteQuestion = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteQuestion(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('questions');
      }
    }
  );
};
