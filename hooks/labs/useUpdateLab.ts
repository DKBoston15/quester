import { useUser } from '@/utils/useUser';
import { updateLab } from 'queries/labs/update-lab';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateLabs = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
      title,
      link,
      equipment,
      instruments,
      products,
      patents,
      manager,
      email,
      phoneNumber
    }: any) => {
      return updateLab(
        id,
        title,
        link,
        equipment,
        instruments,
        products,
        patents,
        manager,
        email,
        phoneNumber,
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
