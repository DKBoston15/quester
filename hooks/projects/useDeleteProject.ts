import { useUser } from '@/utils/useUser';
import { deleteProject } from 'queries/projects/delete-project';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteProject = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteProject(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    }
  );
};
