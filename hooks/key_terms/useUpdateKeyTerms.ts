import { useUser } from '@/utils/useUser';
import { updateKeyTerm } from 'queries/key_terms/update-key-term';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateKeyTerm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, googleScholarLabel }: any) => {
      return updateKeyTerm(id, title, link, googleScholarLabel, user.id).then(
        (result) => result.data
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('key_terms');
      }
    }
  );
};
