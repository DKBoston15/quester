import { getProjects } from 'queries/projects/get-projects';
import { useQuery } from 'react-query';

function useGetProjectsQuery() {
  return useQuery('projects', async () => {
    return getProjects().then((result) => result.data);
  });
}

export default useGetProjectsQuery;
