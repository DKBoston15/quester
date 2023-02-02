import { useUser } from '@/utils/useUser';
import { updateArticle } from 'queries/articles/update-article';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateArticle = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
      title,
      researchParadigm,
      samplingDesign,
      samplingTechnique,
      analyticDesign,
      researchDesign,
      authors,
      year,
      journal,
      volume,
      issue,
      startPage,
      endPage,
      link,
      read,
      literatureType
    }: any) => {
      return updateArticle(
        id,
        title,
        researchParadigm,
        samplingDesign,
        samplingTechnique,
        analyticDesign,
        researchDesign,
        authors,
        year,
        journal,
        volume,
        issue,
        startPage,
        endPage,
        link,
        literatureType,
        read,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('articles');
      }
    }
  );
};
