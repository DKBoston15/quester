import { getSamplesById } from './../../queries/samples/get-samples-by-id';
import { useQuery } from 'react-query';

function useGetSamplesByIdQuery({ projectItemId }: any) {
  return useQuery('samples', async () => {
    return getSamplesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetSamplesByIdQuery;
