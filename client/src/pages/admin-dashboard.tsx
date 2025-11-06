import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { Users, Building2, Trophy, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useUsers, useDeleteUser, useToggleUserStatus } from "@/hooks/useUsers";
import { useGyms, useApproveGym, useRejectGym } from "@/hooks/useGyms";
import { useBadges } from "@/hooks/useBadges";
import { useChallenges } from "@/hooks/useChallenges";
import type { User, Gym, Challenge } from "@shared/schema";

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: users = [] } = useUsers();
  const { data: gyms = [] } = useGyms();
  const { data: badges = [] } = useBadges();
  const { data: challenges = [] } = useChallenges();
  
  const deleteUser = useDeleteUser();
  const toggleUserStatus = useToggleUserStatus();
  const approveGym = useApproveGym();
  const rejectGym = useRejectGym();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const pendingGyms = gyms.filter((g: Gym) => g.status === 'pending');
  const activeChallenges = challenges.filter((c: Challenge) => c.status === 'active');
  
  const style = {
    "--sidebar-width": "16rem",
  };

  const userColumns = [
    { 
      key: 'name', 
      label: 'Nom',
      render: (value: string, row: User) => `${row.firstName} ${row.lastName}`
    },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Rôle',
      render: (value: string) => (
        <Badge variant={value === 'gym_owner' ? 'default' : value === 'super_admin' ? 'destructive' : 'secondary'}>
          {value === 'gym_owner' ? 'Propriétaire' : value === 'super_admin' ? 'Super Admin' : 'Client'}
        </Badge>
      )
    },
    { 
      key: 'isActive', 
      label: 'Statut',
      render: (value: boolean) => (
        <Badge variant={value ? 'default' : 'destructive'}>
          {value ? 'Actif' : 'Désactivé'}
        </Badge>
      )
    },
    { 
      key: 'createdAt', 
      label: 'Inscrit le',
      render: (value: string) => value ? new Date(value).toLocaleDateString('fr-FR') : '-'
    },
  ];

  const gymColumns = [
    { key: 'name', label: 'Nom de la Salle' },
    { key: 'address', label: 'Adresse' },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <Badge className={value === 'pending' ? 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400' : value === 'approved' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-red-500/10 text-red-700 dark:text-red-400'}>
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

  const handleToggleUserStatus = async (userToToggle: User) => {
    const action = userToToggle.isActive ? 'désactiver' : 'activer';
    if (confirm(`Êtes-vous sûr de vouloir ${action} ${userToToggle.firstName} ${userToToggle.lastName}?`)) {
      await toggleUserStatus.mutateAsync({ 
        id: userToToggle.id, 
        isActive: !userToToggle.isActive 
      });
    }
  };

  const handleDeleteUser = async (userToDelete: User) => {
    if (confirm(`Êtes-vous sûr de vouloir SUPPRIMER définitivement ${userToDelete.firstName} ${userToDelete.lastName}?`)) {
      await deleteUser.mutateAsync(userToDelete.id);
    }
  };

  const handleApproveGym = async (gym: Gym) => {
    await approveGym.mutateAsync(gym.id);
  };

  const handleRejectGym = async (gym: Gym) => {
    if (confirm(`Êtes-vous sûr de vouloir rejeter la salle "${gym.name}"?`)) {
      await rejectGym.mutateAsync(gym.id);
    }
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-bold font-display">Tableau de Bord Admin</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              Déconnexion
            </Button>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Utilisateurs" value={users.length.toString()} icon={Users} />
                <StatsCard title="Salles Partenaires" value={gyms.filter((g: Gym) => g.status === 'approved').length.toString()} icon={Building2} trend={`${pendingGyms.length} en attente`} trendUp={false} />
                <StatsCard title="Défis Actifs" value={activeChallenges.length.toString()} icon={Trophy} />
                <StatsCard title="Badges Créés" value={badges.length.toString()} icon={Award} />
              </div>

              {pendingGyms.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-semibold">Salles En Attente d'Approbation</h2>
                  </div>
                  <DataTable 
                    columns={gymColumns}
                    data={pendingGyms}
                    onEdit={handleApproveGym}
                    onDelete={handleRejectGym}
                    editLabel="Approuver"
                    deleteLabel="Rejeter"
                  />
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Tous les Utilisateurs</h2>
                </div>
                <DataTable 
                  columns={userColumns}
                  data={users}
                  onToggle={handleToggleUserStatus}
                  onDelete={handleDeleteUser}
                  toggleLabel="Activer/Désactiver"
                  deleteLabel="Supprimer"
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
