import { updateDarkModeSetting } from 'queries/settings/update-darkmode-setting';
import { useUser } from '@/utils/useUser';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateDarkModeSetting = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    //@ts-ignore
    ({ id, darkMode }: any) => {
      if (!user) return;

      return updateDarkModeSetting(id, darkMode, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      }
    }
  );
};
