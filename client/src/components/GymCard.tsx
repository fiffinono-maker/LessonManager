import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Dumbbell } from "lucide-react";

interface GymCardProps {
  id: string;
  name: string;
  address: string;
  capacity: number;
  equipment: string[];
  status: 'approved' | 'pending' | 'rejected';
  imageUrl: string;
}

export default function GymCard({ id, name, address, capacity, equipment, status, imageUrl }: GymCardProps) {
  const statusColors = {
    approved: 'bg-green-500/10 text-green-700 dark:text-green-400',
    pending: 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
    rejected: 'bg-red-500/10 text-red-700 dark:text-red-400'
  };

  const statusLabels = {
    approved: 'Approuvée',
    pending: 'En attente',
    rejected: 'Rejetée'
  };

  return (
    <Card className="overflow-hidden hover-elevate" data-testid={`card-gym-${id}`}>
      <div className="aspect-[4/3] relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge className={statusColors[status]}>
            {statusLabels[status]}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-3">{name}</h3>
        
        <div className="space-y-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{address}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 flex-shrink-0" />
            <span>Capacité: {capacity} personnes</span>
          </div>
          <div className="flex items-start gap-2">
            <Dumbbell className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <div className="flex flex-wrap gap-1">
              {equipment.slice(0, 3).map((item, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
                  {item}
                </Badge>
              ))}
              {equipment.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{equipment.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-6 pt-0 flex gap-2">
        <Button 
          variant="outline" 
          className="flex-1"
          data-testid={`button-view-gym-${id}`}
          onClick={() => console.log(`View gym ${id}`)}
        >
          Voir Détails
        </Button>
        {status === 'pending' && (
          <Button 
            className="flex-1"
            data-testid={`button-approve-gym-${id}`}
            onClick={() => console.log(`Approve gym ${id}`)}
          >
            Approuver
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
