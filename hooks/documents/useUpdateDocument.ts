import { useUser } from '@/utils/useUser';
import { updateDocument } from 'queries/documents/update-document';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateDocument = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, data, projectItemId }: any) => {
      return updateDocument(id, title, data, projectItemId, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
      }
    }
  );
};
