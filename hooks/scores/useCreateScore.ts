import { useUser } from '@/utils/useUser';
import { createScore } from 'queries/scores/create-score';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateScore = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ score, totalPossibleScore, completedAt, scoreId }: any) => {
      return createScore(
        score,
        totalPossibleScore,
        completedAt,
        scoreId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('scores');
      }
    }
  );
};
