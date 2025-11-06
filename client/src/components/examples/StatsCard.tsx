import StatsCard from '../StatsCard';
import { Users, Trophy, Dumbbell, TrendingUp } from 'lucide-react';

export default function StatsCardExample() {
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard title="Total Users" value="10,234" icon={Users} trend="+12% from last month" trendUp={true} />
      <StatsCard title="Active Challenges" value="45" icon={Trophy} trend="+5 new today" trendUp={true} />
      <StatsCard title="Partner Gyms" value="156" icon={Dumbbell} trend="+8% this quarter" trendUp={true} />
      <StatsCard title="Completion Rate" value="78%" icon={TrendingUp} trend="-2% from average" trendUp={false} />
    </div>
  );
}
