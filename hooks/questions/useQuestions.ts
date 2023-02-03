import { getQuestions } from './../../queries/questions/get-questions';
import { useQuery } from 'react-query';

function useGetQuestions() {
  return useQuery('questions', async () => {
    return getQuestions().then((result) => result.data);
  });
}

export default useGetQuestions;
