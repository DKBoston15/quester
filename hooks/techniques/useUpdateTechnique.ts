import { useUser } from '@/utils/useUser';
import { updateTechnique } from 'queries/techniques/update-technique';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateTechnique = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, technique, method }: any) => {
      return updateTechnique(
        id,
        title,
        link,
        technique,
        method,
        link,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('techniques');
      }
    }
  );
};
