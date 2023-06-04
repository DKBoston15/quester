import { useUser } from '@/utils/useUser';
import { updateSetting } from 'queries/settings/update-setting';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateSetting = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  return useMutation(
    //@ts-ignore
    ({
      id,
      fieldOfStudy,
      inGraduateSchool,
      participatingInCoursework,
      degreeSeeking,
      university,
      status,
      conductingResearch,
      writingProposal,
      writingDissertation,
      attendingConferences,
      lookingForPositions,
      darkMode
    }: any) => {
      if (!user) return;

      return updateSetting(
        id,
        fieldOfStudy,
        inGraduateSchool,
        participatingInCoursework,
        degreeSeeking,
        university,
        status,
        conductingResearch,
        writingProposal,
        writingDissertation,
        attendingConferences,
        lookingForPositions,
        darkMode,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('settings');
      }
    }
  );
};
