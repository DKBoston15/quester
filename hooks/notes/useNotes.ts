import { ResultOptions } from './../../node_modules/react-query/types/core/types.d';
import { getNotesById } from 'queries/notes/get-notes';
import { useQuery } from 'react-query';

async function useGetNotesQuery({ projectItemId, itemId, itemType }: any) {
  const query = {
    queryKey: ['notes'],
    queryFn: getNotesById({ projectItemId, itemId, itemType }).then(
      (result) => result.data
    )
  };
  console.log(await query.queryFn);
  return await query.queryFn;
}

export default useGetNotesQuery;
