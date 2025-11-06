import { useQuery } from '@tanstack/react-query';

type LeaderboardEntry = {
  userId: string;
  firstName: string;
  lastName: string;
  points: number;
  rank: number;
};

export function useLeaderboard() {
  return useQuery<LeaderboardEntry[]>({
    queryKey: ['/api/leaderboard'],
  });
}

export function useUserBadges(userId: string) {
  return useQuery({
    queryKey: ['/api/users', userId, 'badges'],
    enabled: !!userId,
  });
}
