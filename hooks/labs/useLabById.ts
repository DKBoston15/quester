import { getLabById } from './../../queries/labs/get-lab-by-id';
import { useQuery } from 'react-query';

function useGetLabByIdQuery({ id }: any) {
  return useQuery('labs', async () => {
    return getLabById({ id }).then((result) => result.data);
  });
}

export default useGetLabByIdQuery;
