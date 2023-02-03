import { useUser } from '@/utils/useUser';
import { createModel } from 'queries/models/create-model';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateModel = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ title, link, type, projectItemId }: any) => {
      return createModel(title, link, type, projectItemId, user.id).then(
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
