import { useUser } from '@/utils/useUser';
import { updateParadigm } from 'queries/paradigms/update-paradigm';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateParadigm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, category }: any) => {
      return updateParadigm(id, title, link, category, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('paradigms');
      }
    }
  );
};
