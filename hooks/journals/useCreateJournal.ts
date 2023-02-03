import { useUser } from '@/utils/useUser';
import { createJournal } from 'queries/journals/create-journal';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateJournal = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      impactScore,
      editor,
      association,
      publicationFreq,
      keyLiterature,
      primary,
      projectItemId
    }: any) => {
      return createJournal(
        title,
        link,
        impactScore,
        editor,
        association,
        publicationFreq,
        keyLiterature,
        primary,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('journals');
      }
    }
  );
};
