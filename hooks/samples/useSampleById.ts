import { getSampleById } from './../../queries/samples/get-sample-by-id';
import { useQuery } from 'react-query';

function useGetSampleByIdQuery({ id }: any) {
  return useQuery('samples', async () => {
    return getSampleById({ id }).then((result) => result.data);
  });
}

export default useGetSampleByIdQuery;
