import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { queryClient } from '@/lib/queryClient';

type Badge = {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  criteria: Record<string, any>;
  createdAt?: string;
};

type CreateBadgeData = {
  name: string;
  description: string;
  imageUrl?: string;
  criteria: Record<string, any>;
};

export function useBadges() {
  return useQuery<Badge[]>({
    queryKey: ['/api/badges'],
  });
}

export function useCreateBadge() {
  return useMutation({
    mutationFn: async (data: CreateBadgeData) => {
      const res = await apiRequest('POST', '/api/badges', data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
    },
  });
}

export function useUpdateBadge() {
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<CreateBadgeData> }) => {
      const res = await apiRequest('PATCH', `/api/badges/${id}`, data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
    },
  });
}

export function useDeleteBadge() {
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest('DELETE', `/api/badges/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/badges'] });
    },
  });
}
