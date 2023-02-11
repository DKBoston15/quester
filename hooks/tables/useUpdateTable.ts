import { useUser } from '@/utils/useUser';
import { updateTable } from 'queries/tables/update-table';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateTable = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, number, rowCount, columnCount }: any) => {
      return updateTable(
        id,
        title,
        link,
        number,
        rowCount,
        columnCount,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tables');
      }
    }
  );
};
