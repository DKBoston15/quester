import { useUser } from '@/utils/useUser';
import { deleteScore } from 'queries/scores/delete-score';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteScore = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteScore(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('scores');
      }
    }
  );
};
