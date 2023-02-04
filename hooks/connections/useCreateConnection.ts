import { useUser } from '@/utils/useUser';
import { createConnection } from 'queries/connections/create-connection';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateConnection = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({
      projectItemId,
      itemId,
      itemType,
      connectedProjectItemId,
      connectedItemId,
      connectedItemType
    }: any) => {
      return createConnection(
        projectItemId,
        user.id,
        itemId,
        itemType,
        connectedProjectItemId,
        connectedItemId,
        connectedItemType
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        console.log('invalidating');
        queryClient.invalidateQueries('connections');
      }
    }
  );
};
