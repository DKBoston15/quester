import { useUser } from '@/utils/useUser';
import { deleteResearcher } from 'queries/researchers/delete-researcher';
import { useMutation, useQueryClient } from 'react-query';

export const useDeleteResearcher = () => {
  const { user } = useUser();
  const queryClient = useQueryClient();

  if (!user) return;

  return useMutation(
    ({ id }: any) => {
      return deleteResearcher(id, user.id).then((result) => result.data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('researchers');
      }
    }
  );
};
