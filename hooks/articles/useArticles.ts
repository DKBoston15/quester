import { useQuery } from 'react-query';
import { getArticles } from 'queries/articles/get-articles';

function useGetArticles() {
  return useQuery('articles', async () => {
    return getArticles().then((result) => result.data);
  });
}

export default useGetArticles;
