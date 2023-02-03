import { getTables } from './../../queries/tables/get-tables';
import { useQuery } from 'react-query';

function useGetTables() {
  return useQuery('tables', async () => {
    return getTables().then((result) => result.data);
  });
}

export default useGetTables;
