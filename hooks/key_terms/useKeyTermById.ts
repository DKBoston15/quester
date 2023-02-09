import { getKeyTermById } from './../../queries/key_terms/get-key-term-by-id';
import { useQuery } from 'react-query';

function useGetKeyTermByIdQuery({ id }: any) {
  return useQuery('key_terms', async () => {
    return getKeyTermById({ id }).then((result) => result.data);
  });
}

export default useGetKeyTermByIdQuery;
