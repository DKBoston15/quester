import { getTechniques } from './../../queries/techniques/get-techniques';
import { useQuery } from 'react-query';

function useGetTechniques() {
  return useQuery('techniques', async () => {
    return getTechniques().then((result) => result.data);
  });
}

export default useGetTechniques;
