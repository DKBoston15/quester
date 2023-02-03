import { getResearchers } from './../../queries/researchers/get-researchers';
import { useQuery } from 'react-query';

function useGetResearchers() {
  return useQuery('researchers', async () => {
    return getResearchers().then((result) => result.data);
  });
}

export default useGetResearchers;
