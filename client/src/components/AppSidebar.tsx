import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Dumbbell, 
  Trophy, 
  Award, 
  Users,
  Settings,
  Building2
} from "lucide-react";

const adminItems = [
  { title: "Tableau de bord", url: "/admin", icon: LayoutDashboard },
  { title: "Salles", url: "/admin/gyms", icon: Building2 },
  { title: "Exercices", url: "/admin/exercises", icon: Dumbbell },
  { title: "Défis", url: "/admin/challenges", icon: Trophy },
  { title: "Badges", url: "/admin/badges", icon: Award },
  { title: "Utilisateurs", url: "/admin/users", icon: Users },
  { title: "Paramètres", url: "/admin/settings", icon: Settings },
];

export default function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="p-6 border-b">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Trophy className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold font-display">TSPark</div>
            <div className="text-xs text-muted-foreground">Panneau Admin</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Gestion</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild data-testid={`nav-${item.title.toLowerCase()}`}>
                    <a href={item.url} onClick={(e) => { e.preventDefault(); console.log(`Navigate to ${item.url}`); }}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
