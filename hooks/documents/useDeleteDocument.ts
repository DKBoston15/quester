import { useUser } from '@/utils/useUser';
import { deleteDocument } from 'queries/documents/delete-document';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteDocument = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteDocument(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
      }
    }
  );
};
