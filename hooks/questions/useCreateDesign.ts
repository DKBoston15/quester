import { useUser } from '@/utils/useUser';
import { createDesign } from 'queries/designs/create-design';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateDesign = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      technique,
      option,
      startDate,
      endDate,
      link,
      projectItemId
    }: any) => {
      return createDesign(
        title,
        technique,
        option,
        startDate,
        endDate,
        link,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('designs');
      }
    }
  );
};
