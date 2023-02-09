import { getTableById } from './../../queries/tables/get-table-by-id';
import { useQuery } from 'react-query';

function useGetTableByIdQuery({ id }: any) {
  return useQuery('tables', async () => {
    return getTableById({ id }).then((result) => result.data);
  });
}

export default useGetTableByIdQuery;
