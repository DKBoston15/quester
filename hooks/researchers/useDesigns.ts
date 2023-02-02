import { useQuery } from 'react-query';
import { getDesigns } from 'queries/designs/get-designs';

function useGetDesigns() {
  return useQuery('designs', async () => {
    return getDesigns().then((result) => result.data);
  });
}

export default useGetDesigns;
