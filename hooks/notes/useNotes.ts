import { getNotesById } from './../../queries/notes/get-notes';
import { useQuery } from 'react-query';

function useGetNotesQuery({ projectItemId }: any) {
  return useQuery('notes', async () => {
    return getNotesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetNotesQuery;
