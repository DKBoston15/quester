import { getParadigmById } from './../../queries/paradigms/get-paradigm-by-id';
import { useQuery } from 'react-query';

function useGetParadigmByIdQuery({ id }: any) {
  return useQuery('paradigms', async () => {
    return getParadigmById({ id }).then((result) => result.data);
  });
}

export default useGetParadigmByIdQuery;
