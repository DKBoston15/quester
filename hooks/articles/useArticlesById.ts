import { getArticlesById } from '../../queries/articles/get-articles-by-id';
import { useQuery } from 'react-query';

function useGetArticlesByIdQuery({ projectItemId }: any) {
  return useQuery('articles', async () => {
    return getArticlesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetArticlesByIdQuery;
