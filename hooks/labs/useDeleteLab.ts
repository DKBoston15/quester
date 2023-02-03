import { useUser } from '@/utils/useUser';
import { deleteLab } from 'queries/labs/delete-lab';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteLab = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteLab(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('labs');
      }
    }
  );
};
