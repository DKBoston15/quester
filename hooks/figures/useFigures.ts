import { useQuery } from 'react-query';
import { getFigures } from 'queries/figures/get-figures';

function useGetFigures() {
  return useQuery('figures', async () => {
    return getFigures().then((result) => result.data);
  });
}

export default useGetFigures;
