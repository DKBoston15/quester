import { useQuery } from 'react-query';
import { getDesignsById } from 'queries/designs/get-designs-by-id';

function useGetDesignsByIdQuery({ projectItemId }: any) {
  return useQuery('designs', async () => {
    return getDesignsById({ projectItemId }).then((result) => result.data);
  });
}

export default useGetDesignsByIdQuery;
