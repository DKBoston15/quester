//@ts-nocheck
import { useUser } from '@/utils/useUser';
import { createDocument } from 'queries/documents/create-document';
import { useMutation, useQueryClient } from 'react-query';

type CreateDocumentInput = {
  title: string;
  data: any;
  projectItemId: number;
};

type CreateDocumentOutput = Array<{ [key: string]: any }> | null;

export const useCreateDocument = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation<CreateDocumentOutput, unknown, CreateDocumentInput>(
    ({ title, data, projectItemId }) => {
      return createDocument(title, data, projectItemId, user.id).then(
        (result) => {
          return result.data;
        }
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('documents');
      }
    }
  );
};
