import { useUser } from '@/utils/useUser';
import { createTask } from 'queries/tasks/create-task';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateTask = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({ title, dueDate, status, urgency, projectItemId }: any) => {
      return createTask(
        title,
        dueDate,
        status,
        urgency,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );
};
