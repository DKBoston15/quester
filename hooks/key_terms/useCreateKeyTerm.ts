import { useUser } from '@/utils/useUser';
import { createKeyTerm } from 'queries/key_terms/create-key-term';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateKeyTerm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      citations,
      keyLiterature,
      authors,
      primary,
      projectItemId
    }: any) => {
      return createKeyTerm(
        title,
        link,
        citations,
        keyLiterature,
        authors,
        primary,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('key_terms');
      }
    }
  );
};
