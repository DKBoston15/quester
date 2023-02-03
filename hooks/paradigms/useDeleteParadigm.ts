import { useUser } from '@/utils/useUser';
import { deleteParadigm } from 'queries/paradigms/delete-paradigm';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteParadigm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteParadigm(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paradigms');
      }
    }
  );
};
