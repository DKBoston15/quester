import { useUser } from '@/utils/useUser';
import { createResearcher } from 'queries/researchers/create-researcher';
import { useMutation, useQueryClient } from 'react-query';

export const useCreateResearcher = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      firstName,
      lastName,
      email,
      phone,
      linkedin,
      website,
      university,
      role,
      link,
      cvLink,
      professorialStatus,
      keyLiterature,
      projectRole,
      primary,
      projectItemId
    }: any) => {
      return createResearcher(
        firstName,
        lastName,
        email,
        phone,
        linkedin,
        website,
        university,
        role,
        link,
        cvLink,
        professorialStatus,
        keyLiterature,
        projectRole,
        primary,
        projectItemId,
        user.id
      ).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('researchers');
      }
    }
  );
};
