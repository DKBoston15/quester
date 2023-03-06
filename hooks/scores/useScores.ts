import { getScores } from './../../queries/scores/get-scores';
import { useQuery } from 'react-query';

function useGetScores() {
  return useQuery('scores', async () => {
    return getScores().then((result) => result.data);
  });
}

export default useGetScores;
