import BadgeDisplay from '../BadgeDisplay';

export default function BadgeDisplayExample() {
  const mockBadges = [
    { id: '1', name: 'First Steps', description: 'Complete your first challenge', unlocked: true, icon: 'star' as const },
    { id: '2', name: 'Consistency King', description: 'Train 7 days in a row', unlocked: true, icon: 'flame' as const },
    { id: '3', name: 'Century Club', description: 'Complete 100 workouts', unlocked: false, progress: 67, icon: 'trophy' as const },
    { id: '4', name: 'Iron Will', description: 'Finish a hard challenge', unlocked: false, progress: 0, icon: 'medal' as const },
    { id: '5', name: 'Team Player', description: 'Join 5 group challenges', unlocked: true, icon: 'award' as const },
    { id: '6', name: 'Speed Demon', description: 'Run 5K under 25 minutes', unlocked: false, progress: 40, icon: 'zap' as const },
  ];

  return (
    <div className="p-8">
      <BadgeDisplay badges={mockBadges} />
    </div>
  );
}
