import { useUser } from '@/utils/useUser';
import { deleteTechnique } from 'queries/techniques/delete-technique';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteTechnique = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteTechnique(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('techniques');
      }
    }
  );
};
