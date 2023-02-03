import { getModels } from './../../queries/models/get-models';
import { useQuery } from 'react-query';

function useGetModels() {
  return useQuery('models', async () => {
    return getModels().then((result) => result.data);
  });
}

export default useGetModels;
