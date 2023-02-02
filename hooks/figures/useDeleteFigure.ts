import { useUser } from '@/utils/useUser';
import { deleteFigure } from 'queries/figures/delete-figure';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteFigure = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteFigure(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('figures');
      }
    }
  );
};
