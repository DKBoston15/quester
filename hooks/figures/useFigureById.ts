import { getFigureById } from './../../queries/figures/get-figure-by-id';
import { useQuery } from 'react-query';

function useGetFigureByIdQuery({ id }: any) {
  return useQuery('figures', async () => {
    return getFigureById({ id }).then((result) => result.data);
  });
}

export default useGetFigureByIdQuery;
