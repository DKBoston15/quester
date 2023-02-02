import { getNotesById } from './../../queries/notes/get-notes';
import { useQuery } from 'react-query';

function useGetNotesQuery({ projectItemId, itemId, itemType }: any) {
  return useQuery('notes', async () => {
    if (projectItemId) {
      return getNotesById({ projectItemId, itemId, itemType }).then(
        (result) => result.data
      );
    }
  });
}

export default useGetNotesQuery;
