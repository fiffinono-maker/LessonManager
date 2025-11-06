import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { User } from '@shared/schema';

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ['/api/users'],
  });
}

export function useDeleteUser() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/users/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: 'Succès',
        description: 'Utilisateur supprimé avec succès.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

export function useToggleUserStatus() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await apiRequest('PATCH', `/api/users/${id}/status`, { isActive });
      return res.json();
    },
    onSuccess: (_, { isActive }) => {
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
      toast({
        title: 'Succès',
        description: isActive ? 'Utilisateur activé avec succès.' : 'Utilisateur désactivé avec succès.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Erreur',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
