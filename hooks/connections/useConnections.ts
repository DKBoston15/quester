import { getConnectionsById } from './../../queries/connections/get-connections';
import { useQuery } from 'react-query';

function useGetConnectionsQuery({
  projectItemId,
  itemId,
  itemType,
  connectedItemType
}: any) {
  return useQuery('connections', async () => {
    if (projectItemId) {
      return getConnectionsById({
        projectItemId,
        itemId,
        itemType,
        connectedItemType
      }).then((result) => result.data);
    }
  });
}

export default useGetConnectionsQuery;
