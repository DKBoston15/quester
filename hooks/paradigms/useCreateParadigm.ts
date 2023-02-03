import { useUser } from '@/utils/useUser';
import { createParadigm } from 'queries/paradigms/create-paradigm';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateParadigm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ title, link, category, projectItemId }: any) => {
      return createParadigm(title, link, category, projectItemId, user.id).then(
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
