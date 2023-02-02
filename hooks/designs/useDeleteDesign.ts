import { useUser } from '@/utils/useUser';
import { deleteDesign } from 'queries/designs/delete-design';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteDesign = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteDesign(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('designs');
      }
    }
  );
};
