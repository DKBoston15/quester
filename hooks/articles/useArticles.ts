import { getArticlesById } from './../../queries/articles/get-articles';
import { useQuery } from 'react-query';

function useGetArticlesQuery({ projectItemId }: any) {
  return useQuery('articles', async () => {
    return getArticlesById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetArticlesQuery;
