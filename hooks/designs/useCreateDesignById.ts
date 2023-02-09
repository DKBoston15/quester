import { getDesignById } from './../../queries/designs/get-design-by-id';
import { useQuery } from 'react-query';

function useGetDesignByIdQuery({ id }: any) {
  return useQuery('designs', async () => {
    return getDesignById({ id }).then((result) => result.data);
  });
}

export default useGetDesignByIdQuery;
