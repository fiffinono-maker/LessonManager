import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ChallengeCard from "@/components/ChallengeCard";
import FilterBar from "@/components/FilterBar";
import BadgeDisplay from "@/components/BadgeDisplay";
import Leaderboard from "@/components/Leaderboard";
import StatsCard from "@/components/StatsCard";
import { Flame, Trophy, Target } from "lucide-react";
import outdoorImage from '@assets/generated_images/Outdoor_fitness_challenge_7c21f5ee.png';
import groupImage from '@assets/generated_images/Group_fitness_training_0334dacc.png';

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("explore");

  const challenges = [
    { id: '1', title: '30-Day HIIT Challenge', description: 'High-intensity interval training to boost your cardiovascular fitness', difficulty: 'medium' as const, duration: '30 days', participants: 234, imageUrl: outdoorImage },
    { id: '2', title: 'Morning Yoga Flow', description: 'Start your day with energizing yoga sequences', difficulty: 'easy' as const, duration: '21 days', participants: 567, imageUrl: groupImage },
    { id: '3', title: 'Iron Strength Program', description: 'Advanced strength training program', difficulty: 'hard' as const, duration: '60 days', participants: 89, imageUrl: outdoorImage },
  ];

  const badges = [
    { id: '1', name: 'First Steps', description: 'Complete your first challenge', unlocked: true, icon: 'star' as const },
    { id: '2', name: 'Consistency King', description: 'Train 7 days in a row', unlocked: true, icon: 'flame' as const },
    { id: '3', name: 'Century Club', description: 'Complete 100 workouts', unlocked: false, progress: 67, icon: 'trophy' as const },
    { id: '4', name: 'Iron Will', description: 'Finish a hard challenge', unlocked: false, progress: 0, icon: 'medal' as const },
  ];

  const leaderboard = [
    { id: '1', name: 'Sarah Johnson', points: 15420, rank: 1, initials: 'SJ' },
    { id: '2', name: 'Mike Chen', points: 14890, rank: 2, initials: 'MC' },
    { id: '3', name: 'Emma Wilson', points: 13250, rank: 3, initials: 'EW' },
    { id: '4', name: 'David Martinez', points: 12100, rank: 4, initials: 'DM' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">TSPark</h1>
          <Button data-testid="button-profile" variant="outline">
            My Profile
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8" data-testid="tabs-navigation">
            <TabsTrigger value="explore" data-testid="tab-explore">Explore</TabsTrigger>
            <TabsTrigger value="my-challenges" data-testid="tab-my-challenges">My Challenges</TabsTrigger>
            <TabsTrigger value="progress" data-testid="tab-progress">Progress</TabsTrigger>
            <TabsTrigger value="leaderboard" data-testid="tab-leaderboard">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <FilterBar />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.map((challenge) => (
                <ChallengeCard key={challenge.id} {...challenge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my-challenges" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Active Challenges" value="3" icon={Flame} />
              <StatsCard title="Completed" value="12" icon={Trophy} />
              <StatsCard title="Total Points" value="8,450" icon={Target} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {challenges.slice(0, 2).map((challenge) => (
                <ChallengeCard key={challenge.id} {...challenge} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatsCard title="Workouts This Week" value="5" icon={Flame} trend="+2 from last week" trendUp={true} />
              <StatsCard title="Calories Burned" value="2,340" icon={Target} trend="This week" trendUp={true} />
              <StatsCard title="Active Days" value="23" icon={Trophy} trend="This month" trendUp={true} />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">My Badges</h2>
              <BadgeDisplay badges={badges} />
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Leaderboard entries={leaderboard} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
