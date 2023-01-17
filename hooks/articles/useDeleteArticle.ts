import { useUser } from '@/utils/useUser';
import { deleteArticle } from 'queries/articles/delete-article';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteArticle = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({ id }: any) => {
      return deleteArticle(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
      }
    }
  );
};
