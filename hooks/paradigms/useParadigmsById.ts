import { getParadigmsById } from './../../queries/paradigms/get-paradigms-by-id';
import { useQuery } from 'react-query';

function useGetParadigmsByIdQuery({ projectItemId }: any) {
  return useQuery('paradigms', async () => {
    return getParadigmsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetParadigmsByIdQuery;
