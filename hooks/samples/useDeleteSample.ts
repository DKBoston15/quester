import { useUser } from '@/utils/useUser';
import { deleteSample } from 'queries/samples/delete-sample';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteSample = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteSample(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('samples');
      }
    }
  );
};
