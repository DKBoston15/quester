import { useUser } from '@/utils/useUser';
import { createProject } from 'queries/projects/create-project';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateProject = () => {
  const { user } = useUser();

  const queryClient = useQueryClient();

  return useMutation(
    ({ title, type, bgColorClass, pinned }: any) => {
      //@ts-ignore
      return createProject(title, type, bgColorClass, pinned, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    }
  );
};
