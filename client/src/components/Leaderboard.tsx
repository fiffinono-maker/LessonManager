import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Trophy, Medal } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  points: number;
  rank: number;
  initials: string;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
}

export default function Leaderboard({ entries }: LeaderboardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-primary" />
          Meilleurs Performeurs
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {entries.map((entry) => (
            <div 
              key={entry.id}
              className="flex items-center gap-4 p-4 hover-elevate cursor-pointer"
              data-testid={`leaderboard-entry-${entry.id}`}
              onClick={() => console.log(`User ${entry.id} clicked`)}
            >
              <div className="flex items-center justify-center w-8">
                {entry.rank <= 3 ? (
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    entry.rank === 1 ? 'bg-yellow-500' :
                    entry.rank === 2 ? 'bg-gray-400' :
                    'bg-amber-600'
                  }`}>
                    <Medal className="w-4 h-4 text-white" />
                  </div>
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">#{entry.rank}</span>
                )}
              </div>
              
              <Avatar className="w-10 h-10">
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {entry.initials}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="font-medium">{entry.name}</div>
              </div>
              
              <div className="text-right">
                <div className="font-bold text-primary">{entry.points.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">pts</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
