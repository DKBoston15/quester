import { getLabsById } from './../../queries/labs/get-labs-by-id';
import { useQuery } from 'react-query';

function useGetLabsByIdQuery({ projectItemId }: any) {
  return useQuery('labs', async () => {
    return getLabsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetLabsByIdQuery;
