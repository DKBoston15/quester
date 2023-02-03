import { useUser } from '@/utils/useUser';
import { createLab } from 'queries/labs/create-lab';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateLab = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      equipment,
      instruments,
      products,
      patents,
      manager,
      email,
      phoneNumber,
      projectItemId
    }: any) => {
      return createLab(
        title,
        link,
        equipment,
        instruments,
        products,
        patents,
        manager,
        email,
        phoneNumber,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('labs');
      }
    }
  );
};
