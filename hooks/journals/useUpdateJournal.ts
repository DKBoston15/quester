import { useUser } from '@/utils/useUser';
import { updateJournal } from 'queries/journals/update-journal';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateJournal = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
      title,
      link,
      impactScore,
      editor,
      association,
      publicationFreq,
      primary
    }: any) => {
      return updateJournal(
        id,
        title,
        link,
        impactScore,
        editor,
        association,
        publicationFreq,
        primary,
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
