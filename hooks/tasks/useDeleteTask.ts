import { useUser } from '@/utils/useUser';
import { deleteTask } from 'queries/tasks/delete-task';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteTask = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteTask(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('tasks');
      }
    }
  );
};
