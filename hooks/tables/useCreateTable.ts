import { useUser } from '@/utils/useUser';
import { createTable } from 'queries/tables/create-table';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateTable = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      type,
      number,
      rowCount,
      columnCount,
      projectItemId
    }: any) => {
      return createTable(
        title,
        link,
        type,
        number,
        rowCount,
        columnCount,
        projectItemId,
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
