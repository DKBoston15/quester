import { getQuestionById } from './../../queries/questions/get-question-by-id';
import { useQuery } from 'react-query';

function useGetQuestionByIdQuery({ id }: any) {
  return useQuery('questions', async () => {
    return getQuestionById({ id }).then((result) => result.data);
  });
}

export default useGetQuestionByIdQuery;
