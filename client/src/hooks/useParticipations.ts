import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

type Participation = {
  id: string;
  userId: string;
  challengeId: string;
  status: 'active' | 'completed' | 'abandoned';
  progress: Record<string, any>;
  startedAt: string;
  completedAt?: string;
};

type CreateParticipationData = {
  challengeId: string;
};

type UpdateProgressData = {
  progress: Record<string, any>;
};

export function useParticipations(userId?: string) {
  return useQuery<Participation[]>({
    queryKey: userId ? ['/api/participations', userId] : ['/api/participations'],
    enabled: !!userId,
  });
}

export function useCreateParticipation() {
  return useMutation({
    mutationFn: async (data: CreateParticipationData) => {
      const res = await apiRequest('POST', '/api/participations', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/participations'] });
    },
  });
}

export function useUpdateParticipationProgress() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateProgressData }) => {
      const res = await apiRequest('PATCH', `/api/participations/${id}/progress`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/participations'] });
    },
  });
}

export function useCompleteParticipation() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('PATCH', `/api/participations/${id}/complete`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/participations'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    },
  });
}
