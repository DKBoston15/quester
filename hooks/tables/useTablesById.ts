import { getTablesById } from './../../queries/tables/get-tables-by-id';
import { useQuery } from 'react-query';

function useGetTablesByIdQuery({ projectItemId }: any) {
  return useQuery('tables', async () => {
    return getTablesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetTablesByIdQuery;
