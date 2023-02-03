import { getTechniquesById } from './../../queries/techniques/get-techniques-by-id';
import { useQuery } from 'react-query';

function useGetTechniquesByIdQuery({ projectItemId }: any) {
  return useQuery('techniques', async () => {
    return getTechniquesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetTechniquesByIdQuery;
