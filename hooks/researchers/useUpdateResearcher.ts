import { useUser } from '@/utils/useUser';
import { updateResearcher } from 'queries/researchers/update-researcher';
import { useMutation, useQueryClient } from 'react-query';

export const useUpdateResearcher = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({
      id,
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
      primary
    }: any) => {
      return updateResearcher(
        id,
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
