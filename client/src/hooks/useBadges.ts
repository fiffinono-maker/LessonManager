import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Badge } from '@shared/schema';

type CreateBadgeData = {
  name: string;
  description: string;
  icon: string;
  rules: Record<string, any>;
};

export function useBadges() {
  return useQuery<Badge[]>({
    queryKey: ['/api/badges'],
  });
}

export function useCreateBadge() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateBadgeData) => {
      const res = await apiRequest('POST', '/api/badges', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
      toast({
        title: 'Succès',
        description: 'Badge créé avec succès.',
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

export function useUpdateBadge() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateBadgeData> }) => {
      const res = await apiRequest('PATCH', `/api/badges/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
      toast({
        title: 'Succès',
        description: 'Badge modifié avec succès.',
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

export function useDeleteBadge() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/badges/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
      toast({
        title: 'Succès',
        description: 'Badge supprimé avec succès.',
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
