import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { Building2, Users, Trophy, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import gymImage from "@assets/generated_images/Gym_facility_exterior_c300500a.png";

export default function GymOwnerDashboard() {
  const challenges = [
    { id: '1', name: 'Défi Transformation Été', participants: 45, status: 'Actif', startDate: '01/01/2024' },
    { id: '2', name: 'Programme Force', participants: 23, status: 'Actif', startDate: '10/01/2024' },
    { id: '3', name: 'Cardio Intensif', participants: 67, status: 'Terminé', startDate: '15/12/2023' },
  ];

  const challengeColumns = [
    { key: 'name', label: 'Nom du Défi' },
    { key: 'participants', label: 'Participants' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <Badge className={value === 'Actif' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}>
          {value}
        </Badge>
      )
    },
    { key: 'startDate', label: 'Date de Début' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">Tableau de Bord Propriétaire</h1>
          <Button data-testid="button-logout" variant="outline" onClick={() => console.log('Logout')}>
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Capacité Salle" value="150" icon={Building2} />
          <StatsCard title="Membres Actifs" value="89" icon={Users} trend="59% de capacité" trendUp={true} />
          <StatsCard title="Défis Actifs" value="2" icon={Trophy} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <img src={gymImage} alt="Gym" className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">Elite Fitness Center</CardTitle>
                <p className="text-muted-foreground">123 Rue Principale, Centre-ville</p>
              </div>
              <Button data-testid="button-edit-gym">
                Modifier Détails
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Treadmills</Badge>
              <Badge variant="secondary">Free Weights</Badge>
              <Badge variant="secondary">Rowing Machines</Badge>
              <Badge variant="secondary">Yoga Studio</Badge>
            </div>
          </CardContent>
        </Card>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold">Mes Défis</h2>
            <Button data-testid="button-create-challenge">
              <Plus className="w-4 h-4 mr-2" />
              Créer un Défi
            </Button>
          </div>
          <DataTable 
            columns={challengeColumns}
            data={challenges}
            onEdit={(row) => console.log('Edit challenge:', row)}
            onDelete={(row) => console.log('Delete challenge:', row)}
          />
        </div>
      </main>
    </div>
  );
}
