import { useUser } from '@/utils/useUser';
import { updateArticle } from 'queries/articles/update-article';
import { updateDesign } from 'queries/designs/update-design';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateDesign = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id, title, technique, option, startDate, endDate, link }: any) => {
      return updateDesign(
        id,
        title,
        technique,
        option,
        startDate,
        endDate,
        link,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('designs');
      }
    }
  );
};
