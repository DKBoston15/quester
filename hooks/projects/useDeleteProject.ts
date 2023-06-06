import { useUser } from '@/utils/useUser';
import { deleteProject } from 'queries/projects/delete-project';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteProject = () => {
  const { user } = useUser();

  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: any) => {
      //@ts-ignore
      return deleteProject(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    }
  );
};
