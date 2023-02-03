import { useUser } from '@/utils/useUser';
import { deleteKeyTerm } from 'queries/key_terms/delete-key-term';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteKeyTerm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteKeyTerm(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('key_terms');
      }
    }
  );
};
