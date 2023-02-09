import { getResearcherById } from './../../queries/researchers/get-researcher-by-id';
import { useQuery } from 'react-query';

function useGetResearcherByIdQuery({ id }: any) {
  return useQuery('researchers', async () => {
    return getResearcherById({ id }).then((result) => result.data);
  });
}

export default useGetResearcherByIdQuery;
