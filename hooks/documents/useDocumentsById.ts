import { getDocumentsById } from './../../queries/documents/get-documents-by-id';
import { useQuery } from 'react-query';

function useGetDocumentsByIdQuery({ projectItemId }: any) {
  return useQuery('documents', async () => {
    return getDocumentsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetDocumentsByIdQuery;
