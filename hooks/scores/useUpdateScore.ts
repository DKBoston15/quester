import { useUser } from '@/utils/useUser';
import { updateScore } from 'queries/scores/update-score';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateScore = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, score, totalPossibleScore, completedAt, scoreId }: any) => {
      return updateScore(
        id,
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
