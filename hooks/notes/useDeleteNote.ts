import { useUser } from '@/utils/useUser';
import { deleteNote } from 'queries/notes/delete-note';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteNote = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteNote(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      }
    }
  );
};
