import { useUser } from '@/utils/useUser';
import { deleteTable } from 'queries/tables/delete-table';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteTable = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteTable(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tables');
      }
    }
  );
};
