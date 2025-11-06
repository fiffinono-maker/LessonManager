import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Star, Flame, Medal, Zap, Award } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface BadgeItem {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  progress?: number;
  icon: 'trophy' | 'star' | 'flame' | 'medal' | 'zap' | 'award';
}

interface BadgeDisplayProps {
  badges: BadgeItem[];
}

const iconMap = {
  trophy: Trophy,
  star: Star,
  flame: Flame,
  medal: Medal,
  zap: Zap,
  award: Award
};

export default function BadgeDisplay({ badges }: BadgeDisplayProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {badges.map((badge) => {
        const Icon = iconMap[badge.icon];
        return (
          <Card 
            key={badge.id}
            className={`${!badge.unlocked ? 'opacity-50' : ''} hover-elevate cursor-pointer`}
            data-testid={`badge-${badge.id}`}
            onClick={() => console.log(`Badge ${badge.id} clicked`)}
          >
            <CardContent className="p-4 text-center">
              <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${
                badge.unlocked 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon className="w-8 h-8" />
              </div>
              <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{badge.description}</p>
              {!badge.unlocked && badge.progress !== undefined && (
                <div className="space-y-1">
                  <Progress value={badge.progress} className="h-1" />
                  <div className="text-xs text-muted-foreground">{badge.progress}%</div>
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
