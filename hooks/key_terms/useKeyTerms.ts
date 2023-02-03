import { getKeyTerms } from './../../queries/key_terms/get-key-terms';
import { useQuery } from 'react-query';

function useGetKeyTerms() {
  return useQuery('key_terms', async () => {
    return getKeyTerms().then((result) => result.data);
  });
}

export default useGetKeyTerms;
