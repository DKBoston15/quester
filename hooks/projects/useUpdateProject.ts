import { useUser } from '@/utils/useUser';
import { updateProject } from 'queries/projects/update-project';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateProject = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({
      id,
      title,
      type,
      bgColorClass,
      pinned,
      description,
      checklist
    }: any) => {
      return updateProject(
        id,
        title,
        type,
        bgColorClass,
        pinned,
        description,
        checklist,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('projects');
      }
    }
  );
};
