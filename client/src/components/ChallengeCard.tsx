import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Flame } from "lucide-react";

interface ChallengeCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  participants: number;
  imageUrl: string;
}

export default function ChallengeCard({ 
  id, 
  title, 
  description, 
  difficulty, 
  duration, 
  participants, 
  imageUrl 
}: ChallengeCardProps) {
  const difficultyColors = {
    easy: 'bg-green-500/10 text-green-700 dark:text-green-400',
    medium: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    hard: 'bg-red-500/10 text-red-700 dark:text-red-400'
  };

  const difficultyLabels = {
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile'
  };

  return (
    <Card 
      className="overflow-hidden hover-elevate cursor-pointer" 
      data-testid={`card-challenge-${id}`}
      onClick={() => console.log(`Challenge ${id} clicked`)}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={difficultyColors[difficulty]}>
            {difficultyLabels[difficulty]}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{participants}</span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full" 
          data-testid={`button-join-challenge-${id}`}
          onClick={(e) => {
            e.stopPropagation();
            console.log(`Join challenge ${id}`);
          }}
        >
          <Flame className="w-4 h-4 mr-2" />
          Rejoindre le Défi
        </Button>
      </CardFooter>
    </Card>
  );
}
