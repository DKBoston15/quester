import { getResearchersById } from './../../queries/researchers/get-researchers-by-id';
import { useQuery } from 'react-query';

function useGetResearchersByIdQuery({ projectItemId }: any) {
  return useQuery('researchers', async () => {
    return getResearchersById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetResearchersByIdQuery;
