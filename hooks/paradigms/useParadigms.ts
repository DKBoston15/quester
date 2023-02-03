import { getParadigms } from './../../queries/paradigms/get-paradigms';
import { useQuery } from 'react-query';

function useGetParadigms() {
  return useQuery('paradigms', async () => {
    return getParadigms().then((result) => result.data);
  });
}

export default useGetParadigms;
