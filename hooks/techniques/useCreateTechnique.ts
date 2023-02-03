import { useUser } from '@/utils/useUser';
import { createTechnique } from 'queries/techniques/create-technique';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateTechnique = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ title, link, technique, method, projectItemId }: any) => {
      return createTechnique(
        title,
        link,
        technique,
        method,
        projectItemId,
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
