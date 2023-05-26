import { getSettingById } from './../../queries/settings/get-setting-by-id';
import { useQuery } from 'react-query';

function useGetSettingByIdQuery({ id }: any) {
  return useQuery('settings', async () => {
    return getSettingById({ id }).then((result) => result.data);
  });
}

export default useGetSettingByIdQuery;
