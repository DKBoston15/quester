import { getJournals } from './../../queries/journals/get-journals';
import { useQuery } from 'react-query';

function useGetJournals() {
  return useQuery('journals', async () => {
    return getJournals().then((result) => result.data);
  });
}

export default useGetJournals;
