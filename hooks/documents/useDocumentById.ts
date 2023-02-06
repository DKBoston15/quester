import { getDocumentById } from './../../queries/documents/get-document-by-id';
import { useQuery } from 'react-query';

function useGetDocumentByIdQuery({ id }: any) {
  return useQuery('documents', async () => {
    return getDocumentById({ id }).then((result) => result.data);
  });
}

export default useGetDocumentByIdQuery;
