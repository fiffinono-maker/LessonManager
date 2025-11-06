import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BadgeDialog } from "@/components/BadgeDialog";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useBadges, useDeleteBadge } from "@/hooks/useBadges";
import { Trophy, Star, Medal, Award, Flame, Target } from "lucide-react";
import type { Badge as BadgeType } from "@shared/schema";

const iconMap: Record<string, React.ComponentType<any>> = {
  trophy: Trophy,
  star: Star,
  medal: Medal,
  award: Award,
  flame: Flame,
  target: Target,
};

export default function AdminBadges() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: badges = [], refetch } = useBadges();
  const deleteBadge = useDeleteBadge();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteBadge = async (badge: BadgeType) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer le badge "${badge.name}"?`)) {
      await deleteBadge.mutateAsync(badge.id);
      refetch();
    }
  };

  const badgeColumns = [
    { 
      key: 'icon', 
      label: 'Icône',
      render: (value: string) => {
        const IconComponent = iconMap[value] || Trophy;
        return (
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>
        );
      }
    },
    { key: 'name', label: 'Nom' },
    { 
      key: 'description', 
      label: 'Description',
      render: (value: string) => (
        <span className="line-clamp-2 max-w-md">{value}</span>
      )
    },
    { 
      key: 'rules', 
      label: 'Règles',
      render: (value: any) => (
        <Badge variant="outline" className="font-mono text-xs">
          {value?.type || 'N/A'}
        </Badge>
      )
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
            <h1 className="text-xl font-bold font-display">Gestion des Badges</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              Déconnexion
            </Button>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Badges et Récompenses</h2>
                  <p className="text-muted-foreground mt-1">
                    Créez des badges avec des règles dynamiques pour récompenser les utilisateurs
                  </p>
                </div>
                <BadgeDialog onSuccess={refetch} />
              </div>

              <DataTable 
                columns={badgeColumns}
                data={badges}
                onDelete={handleDeleteBadge}
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
