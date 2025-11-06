import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'super_admin' | 'gym_owner' | 'client';
  createdAt?: string;
};

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['/api/users'],
  });
}

export function useDeleteUser() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/users/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    },
  });
}
