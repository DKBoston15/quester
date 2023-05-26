import { useUser } from '@/utils/useUser';
import { deleteSetting } from 'queries/settings/delete-setting';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteSetting = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteSetting(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      }
    }
  );
};
