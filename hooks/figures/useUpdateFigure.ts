import { useUser } from '@/utils/useUser';
import { updateFigure } from 'queries/figures/update-figure';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateFigure = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, type, number, link }: any) => {
      return updateFigure(id, title, link, type, number, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('figures');
      }
    }
  );
};
