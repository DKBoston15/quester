import { useUser } from '@/utils/useUser';
import { deleteConnection } from 'queries/connections/delete-connection';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteConnection = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteConnection(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('connections');
      }
    }
  );
};
