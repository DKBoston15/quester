import { getJournalsById } from './../../queries/journals/get-journals-by-id';
import { useQuery } from 'react-query';

function useGetJournalsByIdQuery({ projectItemId }: any) {
  return useQuery('journals', async () => {
    return getJournalsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetJournalsByIdQuery;
