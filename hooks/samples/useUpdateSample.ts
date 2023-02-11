import { useUser } from '@/utils/useUser';
import { updateSample } from 'queries/samples/update-samples';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateSample = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
      title,
      link,
      design,
      size,
      finalSample,
      powerAnalysis,
      startDate,
      endDate
    }: any) => {
      return updateSample(
        id,
        title,
        link,
        design,
        size,
        finalSample,
        powerAnalysis,
        startDate,
        endDate,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('samples');
      }
    }
  );
};
