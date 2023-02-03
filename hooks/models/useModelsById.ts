import { getModelsById } from './../../queries/models/get-models-by-id';
import { useQuery } from 'react-query';

function useGetModelsByIdQuery({ projectItemId }: any) {
  return useQuery('models', async () => {
    return getModelsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetModelsByIdQuery;
