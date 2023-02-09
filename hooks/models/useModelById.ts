import { getModelById } from './../../queries/models/get-model-by-id';
import { useQuery } from 'react-query';

function useGetModelByIdQuery({ id }: any) {
  return useQuery('models', async () => {
    return getModelById({ id }).then((result) => result.data);
  });
}

export default useGetModelByIdQuery;
