import { useUser } from '@/utils/useUser';
import { createFigure } from 'queries/figures/create-figure';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateFigure = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ title, link, type, number, projectItemId }: any) => {
      return createFigure(
        title,
        link,
        type,
        number,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('figures');
      }
    }
  );
};
