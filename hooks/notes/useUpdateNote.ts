import { useUser } from '@/utils/useUser';
import { updateNote } from 'queries/notes/update-note';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateNote = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, body }: any) => {
      return updateNote(id, body, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      }
    }
  );
};
