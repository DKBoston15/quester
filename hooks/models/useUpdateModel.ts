import { useUser } from '@/utils/useUser';
import { updateModel } from 'queries/models/update-model';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateModel = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, type }: any) => {
      return updateModel(id, title, link, type, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('models');
      }
    }
  );
};
