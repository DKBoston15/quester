import { useUser } from '@/utils/useUser';
import { createDocument } from 'queries/documents/create-document';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateDocument = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({ title, data, projectItemId }: any) => {
      return createDocument(title, data, projectItemId, user.id).then(
        (result) => {
          return result.data;
        }
      );
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries('documents');
        return data;
      }
    }
  );
};
