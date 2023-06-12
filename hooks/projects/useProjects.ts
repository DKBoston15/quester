import { Project } from '@/utils/types';
import { getProjects } from 'queries/projects/get-projects';
import { useQuery } from 'react-query';

function useGetProjectsQuery() {
  return useQuery<Project[], Error>('projects', async () => {
    return getProjects();
  });
}

export default useGetProjectsQuery;
