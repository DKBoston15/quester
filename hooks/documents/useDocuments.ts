import { getDocuments } from './../../queries/documents/get-documents';
import { useQuery } from 'react-query';

function useGetDocuments() {
  return useQuery('documents', async () => {
    return getDocuments().then((result) => result.data);
  });
}

export default useGetDocuments;
