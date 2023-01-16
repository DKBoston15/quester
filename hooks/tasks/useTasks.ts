import { getTasks } from './../../queries/tasks/get-tasks';
import { useQuery } from 'react-query';

function useGetTasksQuery({ projectItemId }: any) {
  return useQuery('tasks', async () => {
    return getTasks({ projectItemId }).then((result) => result.data);
  });
}

export default useGetTasksQuery;
