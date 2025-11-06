import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import type { Exercise } from '@shared/schema';

type CreateExerciseData = {
  name: string;
  description: string;
  targetMuscles: string[];
};

export function useExercises() {
  return useQuery<Exercise[]>({
    queryKey: ['/api/exercises'],
  });
}

export function useExercise(id: string) {
  return useQuery<Exercise>({
    queryKey: ['/api/exercises', id],
    enabled: !!id,
  });
}

export function useCreateExercise() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: CreateExerciseData) => {
      const res = await apiRequest('POST', '/api/exercises', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      toast({
        title: 'Succès',
        description: 'Exercice créé avec succès.',
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

export function useUpdateExercise() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateExerciseData> }) => {
      const res = await apiRequest('PATCH', `/api/exercises/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      toast({
        title: 'Succès',
        description: 'Exercice modifié avec succès.',
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

export function useDeleteExercise() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/exercises/${id}`);
      return res.ok;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/exercises'] });
      toast({
        title: 'Succès',
        description: 'Exercice supprimé avec succès.',
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
