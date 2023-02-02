import { useQuery } from 'react-query';
import { getFiguresById } from 'queries/figures/get-figures-by-id';

function useGetFiguresByIdQuery({ projectItemId }: any) {
  return useQuery('figures', async () => {
    return getFiguresById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetFiguresByIdQuery;
