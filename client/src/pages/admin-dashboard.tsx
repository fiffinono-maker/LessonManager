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
    { name: 'Sarah Johnson', email: 'sarah@example.com', role: 'client', status: 'Active', joinedAt: '2024-01-15' },
    { name: 'Mike Chen', email: 'mike@example.com', role: 'gym_owner', status: 'Active', joinedAt: '2024-01-14' },
    { name: 'Emma Wilson', email: 'emma@example.com', role: 'client', status: 'Pending', joinedAt: '2024-01-13' },
  ];

  const userColumns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => (
        <Badge variant={value === 'gym_owner' ? 'default' : 'secondary'}>
          {value === 'gym_owner' ? 'Gym Owner' : 'Client'}
        </Badge>
      )
    },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge className={value === 'Active' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-700 dark:text-yellow-400'}>
          {value}
        </Badge>
      )
    },
    { key: 'joinedAt', label: 'Joined' },
  ];

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <h1 className="text-xl font-bold font-display">Admin Dashboard</h1>
            <div className="w-10" />
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard title="Total Users" value="10,234" icon={Users} trend="+12% from last month" trendUp={true} />
                <StatsCard title="Partner Gyms" value="156" icon={Building2} trend="+8 this month" trendUp={true} />
                <StatsCard title="Active Challenges" value="45" icon={Trophy} trend="+5 new today" trendUp={true} />
                <StatsCard title="Badges Awarded" value="23,456" icon={Award} trend="+234 this week" trendUp={true} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-semibold">Recent Users</h2>
                  <Button data-testid="button-view-all-users">View All</Button>
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
