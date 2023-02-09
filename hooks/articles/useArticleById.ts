import { getArticleById } from './../../queries/articles/get-article-by-id';
import { useQuery } from 'react-query';

function useGetArticleByIdQuery({ id }: any) {
  return useQuery('articles', async () => {
    return getArticleById({ id }).then((result) => result.data);
  });
}

export default useGetArticleByIdQuery;
