import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GymDialog } from "@/components/GymDialog";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useGyms, useApproveGym, useRejectGym, useDeleteGym } from "@/hooks/useGyms";
import type { Gym } from "@shared/schema";

export default function AdminGyms() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: gyms = [], refetch } = useGyms();
  const approveGym = useApproveGym();
  const rejectGym = useRejectGym();
  const deleteGym = useDeleteGym();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleApproveGym = async (gym: Gym) => {
    await approveGym.mutateAsync(gym.id);
    refetch();
  };

  const handleRejectGym = async (gym: Gym) => {
    if (confirm(`Êtes-vous sûr de vouloir rejeter la salle "${gym.name}"?`)) {
      await rejectGym.mutateAsync(gym.id);
      refetch();
    }
  };

  const handleDeleteGym = async (gym: Gym) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer définitivement la salle "${gym.name}"?`)) {
      await deleteGym.mutateAsync(gym.id);
      refetch();
    }
  };

  const gymColumns = [
    { key: 'name', label: 'Nom de la Salle' },
    { key: 'address', label: 'Adresse' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <Badge className={
          value === 'pending' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' : 
          value === 'approved' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 
          'bg-red-500/10 text-red-700 dark:text-red-400'
        }>
          {value === 'pending' ? 'En attente' : value === 'approved' ? 'Approuvée' : 'Rejetée'}
        </Badge>
      )
    },
    { 
      key: 'capacity', 
      label: 'Capacité',
      render: (value: number) => value.toString()
    },
  ];

  const style = {
    "--sidebar-width": "16rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-bold font-display">Gestion des Salles</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              Déconnexion
            </Button>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Salles Partenaires</h2>
                  <p className="text-muted-foreground mt-1">
                    Gérez les salles d'entraînement, approuvez ou rejetez les demandes
                  </p>
                </div>
                <GymDialog ownerId={user?.id || ''} onSuccess={refetch} />
              </div>

              <DataTable 
                columns={gymColumns}
                data={gyms}
                onEdit={handleApproveGym}
                onDelete={handleDeleteGym}
                editLabel="Approuver"
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
