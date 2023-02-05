import { getKeyTermsById } from './../../queries/key_terms/get-key-terms-by-id';
import { useQuery } from 'react-query';

function useGetKeyTermsByIdQuery({ projectItemId }: any) {
  return useQuery('key_terms', async () => {
    return getKeyTermsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetKeyTermsByIdQuery;
