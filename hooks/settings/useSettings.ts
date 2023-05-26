import { getSettings } from './../../queries/settings/get-settings';
import { useQuery } from 'react-query';

function useGetSettings() {
  return useQuery('settings', async () => {
    return getSettings().then((result) => result.data);
  });
}

export default useGetSettings;
