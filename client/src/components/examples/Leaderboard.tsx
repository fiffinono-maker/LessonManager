import Leaderboard from '../Leaderboard';

export default function LeaderboardExample() {
  const mockEntries = [
    { id: '1', name: 'Sarah Johnson', points: 15420, rank: 1, initials: 'SJ' },
    { id: '2', name: 'Mike Chen', points: 14890, rank: 2, initials: 'MC' },
    { id: '3', name: 'Emma Wilson', points: 13250, rank: 3, initials: 'EW' },
    { id: '4', name: 'David Martinez', points: 12100, rank: 4, initials: 'DM' },
    { id: '5', name: 'Lisa Anderson', points: 11800, rank: 5, initials: 'LA' },
    { id: '6', name: 'James Taylor', points: 10950, rank: 6, initials: 'JT' },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <Leaderboard entries={mockEntries} />
    </div>
  );
}
