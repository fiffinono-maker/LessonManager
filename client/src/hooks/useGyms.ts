import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

export function useGyms(status?: string) {
  return useQuery({
    queryKey: ['gyms', status],
    queryFn: () => api.gyms.getAll(status),
  });
}

export function useGym(id: string) {
  return useQuery({
    queryKey: ['gyms', id],
    queryFn: () => api.gyms.getById(id),
    enabled: !!id,
  });
}

export function useCreateGym() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.gyms.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      toast({
        title: 'Succès',
        description: 'Salle créée avec succès. En attente d\'approbation.',
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

export function useUpdateGym() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => api.gyms.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      toast({
        title: 'Succès',
        description: 'Salle modifiée avec succès.',
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

export function useApproveGym() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.gyms.approve,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      toast({
        title: 'Succès',
        description: 'Salle approuvée.',
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

export function useRejectGym() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.gyms.reject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      toast({
        title: 'Succès',
        description: 'Salle rejetée.',
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

export function useDeleteGym() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: api.gyms.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gyms'] });
      toast({
        title: 'Succès',
        description: 'Salle supprimée.',
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
