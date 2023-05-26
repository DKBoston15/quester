import { useUser } from '@/utils/useUser';
import { createSetting } from 'queries/settings/create-setting';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateSetting = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  const createUserSetting = async ({
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

    return createSetting(
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
  };

  return useMutation(createUserSetting, {
    onSuccess: () => {
      queryClient.invalidateQueries('settings');
    }
  });
};
