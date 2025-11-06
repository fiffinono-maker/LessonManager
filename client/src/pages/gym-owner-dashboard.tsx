import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { Building2, Users, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GymDialog } from "@/components/GymDialog";
import { ChallengeDialog } from "@/components/ChallengeDialog";
import { useAuth } from "@/hooks/useAuth";
import { useGyms } from "@/hooks/useGyms";
import { useChallenges, useDeleteChallenge } from "@/hooks/useChallenges";
import { useLocation } from "wouter";
import gymImage from "@assets/generated_images/Gym_facility_exterior_c300500a.png";

export default function GymOwnerDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: gyms = [], refetch: refetchGyms } = useGyms();
  const { data: allChallenges = [], refetch: refetchChallenges } = useChallenges();
  const deleteChallenge = useDeleteChallenge();

  const myGym = gyms.find((g: any) => g.ownerId === user?.id);
  const challenges = allChallenges.filter((c: any) => c.creatorId === user?.id && c.gymId === myGym?.id);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteChallenge = async (challenge: any) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${challenge.title}"?`)) {
      await deleteChallenge.mutateAsync(challenge.id);
      refetchChallenges();
    }
  };

  const challengeColumns = [
    { 
      key: 'title', 
      label: 'Nom du Défi',
      render: (value: string, row: any) => row.title
    },
    { 
      key: 'difficulty', 
      label: 'Difficulté',
      render: (value: string) => (
        <Badge variant="secondary">
          {value === 'easy' ? 'Facile' : value === 'medium' ? 'Moyen' : 'Difficile'}
        </Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <Badge className={value === 'active' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}>
          {value === 'active' ? 'Actif' : value === 'draft' ? 'Brouillon' : value === 'completed' ? 'Terminé' : 'Annulé'}
        </Badge>
      )
    },
    { 
      key: 'durationDays', 
      label: 'Durée',
      render: (value: number) => `${value} jours`
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">Tableau de Bord Propriétaire</h1>
          <Button data-testid="button-logout" variant="outline" onClick={handleLogout}>
            Déconnexion
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Capacité Salle" value={myGym?.capacity?.toString() || '-'} icon={Building2} />
          <StatsCard title="Statut" value={myGym?.status === 'approved' ? 'Approuvée' : myGym?.status === 'pending' ? 'En Attente' : myGym?.status === 'rejected' ? 'Rejetée' : 'Aucune'} icon={Users} />
          <StatsCard title="Défis Actifs" value={challenges.filter((c: any) => c.status === 'active').length.toString()} icon={Trophy} />
        </div>

        {!myGym ? (
          <Card>
            <CardHeader>
              <CardTitle>Créez Votre Salle</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Vous n'avez pas encore de salle enregistrée. Créez-en une pour commencer à proposer des défis.
              </p>
              <GymDialog ownerId={user?.id || ''} onSuccess={refetchGyms} />
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img 
                  src={myGym.imageUrl || gymImage} 
                  alt="Gym" 
                  className="w-24 h-24 rounded-lg object-cover" 
                />
                <div className="flex-1">
                  <CardTitle className="text-2xl mb-1">{myGym.name}</CardTitle>
                  <p className="text-muted-foreground">{myGym.address}</p>
                  {myGym.status === 'pending' && (
                    <Badge className="mt-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400">
                      En attente d'approbation
                    </Badge>
                  )}
                  {myGym.status === 'rejected' && (
                    <Badge className="mt-2 bg-red-500/10 text-red-700 dark:text-red-400">
                      Rejetée
                    </Badge>
                  )}
                </div>
                <GymDialog 
                  gym={myGym} 
                  ownerId={user?.id || ''} 
                  onSuccess={refetchGyms}
                  trigger={
                    <Button data-testid="button-edit-gym">
                      Modifier Détails
                    </Button>
                  }
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              {myGym.description && (
                <p className="text-sm text-muted-foreground mb-2">{myGym.description}</p>
              )}
              <div className="flex flex-wrap gap-2">
                {myGym.equipment?.map((item: string, idx: number) => (
                  <Badge key={idx} variant="secondary">{item}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {myGym && myGym.status === 'approved' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-semibold">Mes Défis</h2>
              <ChallengeDialog 
                creatorId={user?.id || ''} 
                gymId={myGym.id}
                onSuccess={refetchChallenges}
              />
            </div>
            <DataTable 
              columns={challengeColumns}
              data={challenges.map((c: any) => ({ ...c, id: c.id }))}
              onDelete={handleDeleteChallenge}
            />
          </div>
        )}
      </main>
    </div>
  );
}
