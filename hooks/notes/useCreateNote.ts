import { useUser } from '@/utils/useUser';
import { createNote } from 'queries/notes/create-note';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateNote = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({ body, projectItemId, itemId, itemType }: any) => {
      console.log(user);
      return createNote(body, projectItemId, user.id, itemId, itemType).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('notes');
      }
    }
  );
};
