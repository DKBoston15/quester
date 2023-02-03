import { useUser } from '@/utils/useUser';
import { deleteJournal } from 'queries/journals/delete-journal';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteJournal = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteJournal(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('journals');
      }
    }
  );
};
