import { useUser } from '@/utils/useUser';
import { deleteModel } from 'queries/models/delete-model';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteModel = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteModel(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('models');
      }
    }
  );
};
