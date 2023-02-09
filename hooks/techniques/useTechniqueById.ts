import { getTechniqueById } from './../../queries/techniques/get-technique-by-id';
import { useQuery } from 'react-query';

function useGetTechniqueByIdQuery({ id }: any) {
  return useQuery('techniques', async () => {
    return getTechniqueById({ id }).then((result) => result.data);
  });
}

export default useGetTechniqueByIdQuery;
