import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { Users, Building2, Trophy, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const style = {
    "--sidebar-width": "16rem",
  };

  const recentUsers = [
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'client', status: 'Actif', joinedAt: '15/01/2024' },
    { name: 'Mike Chen', email: 'mike@example.com', role: 'gym_owner', status: 'Actif', joinedAt: '14/01/2024' },
    { name: 'Emma Wilson', email: 'emma@example.com', role: 'client', status: 'En attente', joinedAt: '13/01/2024' },
  ];

  const userColumns = [
    { key: 'name', label: 'Nom' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Rôle',
      render: (value: string) => (
        <Badge variant={value === 'gym_owner' ? 'default' : 'secondary'}>
          {value === 'gym_owner' ? 'Propriétaire' : 'Client'}
        </Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Statut',
      render: (value: string) => (
        <Badge className={value === 'Actif' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'}>
          {value}
        </Badge>
      )
    },
    { key: 'joinedAt', label: 'Inscrit le' },
  ];

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-bold font-display">Tableau de Bord Admin</h1>
            <div className="w-10" />
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Utilisateurs" value="10 234" icon={Users} trend="+12% depuis le mois dernier" trendUp={true} />
                <StatsCard title="Salles Partenaires" value="156" icon={Building2} trend="+8 ce mois-ci" trendUp={true} />
                <StatsCard title="Défis Actifs" value="45" icon={Trophy} trend="+5 nouveaux aujourd'hui" trendUp={true} />
                <StatsCard title="Badges Attribués" value="23 456" icon={Award} trend="+234 cette semaine" trendUp={true} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Utilisateurs Récents</h2>
                  <Button data-testid="button-view-all-users">Voir Tout</Button>
                </div>
                <DataTable 
                  columns={userColumns}
                  data={recentUsers}
                  onEdit={(row) => console.log('Edit user:', row)}
                  onDelete={(row) => console.log('Delete user:', row)}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
