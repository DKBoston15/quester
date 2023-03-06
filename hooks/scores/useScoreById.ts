import { getScoreById } from './../../queries/scores/get-score-by-id';
import { useQuery } from 'react-query';

function useGetScoreByIdQuery({ scoreId }: any) {
  return useQuery('scores', async () => {
    return getScoreById({ scoreId }).then((result) => result.data);
  });
}

export default useGetScoreByIdQuery;
