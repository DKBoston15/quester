import { useUser } from '@/utils/useUser';
import { updateTask } from 'queries/tasks/update-task';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateTask = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, dueDate, status, urgency }: any) => {
      return updateTask(id, title, dueDate, status, urgency, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );
};
