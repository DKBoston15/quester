import { useUser } from '@/utils/useUser';
import { updateKeyTerm } from 'queries/key_terms/update-key-term';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateKeyTerm = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, link, citations, keyLiterature, authors, primary }: any) => {
      return updateKeyTerm(
        id,
        title,
        link,
        citations,
        keyLiterature,
        authors,
        primary,
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
