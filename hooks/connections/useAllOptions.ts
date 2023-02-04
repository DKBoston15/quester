import { getAllOptions } from './../../queries/connections/get-all-options';
import { useQuery } from 'react-query';
import { useUser } from '@/utils/useUser';

function useAllOptionsQuery() {
  const { user } = useUser();
  return useQuery('connections', async () => {
    if (user) {
      return getAllOptions(user.id).then((result) => result);
    }
  });
}

export default useAllOptionsQuery;
