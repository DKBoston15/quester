import { useUser } from '@/utils/useUser';
import { createSample } from 'queries/samples/create-sample';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateSample = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      title,
      link,
      design,
      technique,
      size,
      finalSample,
      powerAnalysis,
      startDate,
      endDate,
      projectItemId
    }: any) => {
      return createSample(
        title,
        link,
        design,
        technique,
        size,
        finalSample,
        powerAnalysis,
        startDate,
        endDate,
        projectItemId,
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
