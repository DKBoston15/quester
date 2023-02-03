import { getQuestionsById } from './../../queries/questions/get-questions-by-id';
import { useQuery } from 'react-query';

function useGetQuestionsByIdQuery({ projectItemId }: any) {
  return useQuery('questions', async () => {
    return getQuestionsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetQuestionsByIdQuery;
