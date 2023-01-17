import { useUser } from '@/utils/useUser';
import { createArticle } from 'queries/articles/create-article';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateArticle = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    ({
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
      projectItemId
    }: any) => {
      return createArticle(
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
        projectItemId,
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
