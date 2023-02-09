import { getJournalById } from './../../queries/journals/get-journal-by-id';
import { useQuery } from 'react-query';

function useGetJournalByIdQuery({ id }: any) {
  return useQuery('journals', async () => {
    return getJournalById({ id }).then((result) => result.data);
  });
}

export default useGetJournalByIdQuery;
