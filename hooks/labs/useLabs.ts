import { getLabs } from './../../queries/labs/get-labs';
import { useQuery } from 'react-query';

function useGetLabs() {
  return useQuery('labs', async () => {
    return getLabs().then((result) => result.data);
  });
}

export default useGetLabs;
