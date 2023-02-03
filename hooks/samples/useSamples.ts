import { getSamples } from './../../queries/samples/get-samples';
import { useQuery } from 'react-query';

function useGetSamples() {
  return useQuery('samples', async () => {
    return getSamples().then((result) => result.data);
  });
}

export default useGetSamples;
