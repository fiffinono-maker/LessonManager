import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatsCard from "@/components/StatsCard";
import DataTable from "@/components/DataTable";
import { Building2, Users, Trophy, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import gymImage from "@assets/generated_images/Gym_facility_exterior_c300500a.png";

export default function GymOwnerDashboard() {
  const challenges = [
    { id: '1', name: 'Summer Shred Challenge', participants: 45, status: 'Active', startDate: '2024-01-01' },
    { id: '2', name: 'Strength Builder', participants: 23, status: 'Active', startDate: '2024-01-10' },
    { id: '3', name: 'Cardio Blast', participants: 67, status: 'Completed', startDate: '2023-12-15' },
  ];

  const challengeColumns = [
    { key: 'name', label: 'Challenge Name' },
    { key: 'participants', label: 'Participants' },
    { 
      key: 'status', 
      label: 'Status',
      render: (value: string) => (
        <Badge className={value === 'Active' ? 'bg-green-500/10 text-green-700 dark:text-green-400' : 'bg-gray-500/10 text-gray-700 dark:text-gray-400'}>
          {value}
        </Badge>
      )
    },
    { key: 'startDate', label: 'Start Date' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold font-display">Gym Owner Dashboard</h1>
          <Button data-testid="button-logout" variant="outline" onClick={() => console.log('Logout')}>
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatsCard title="Gym Capacity" value="150" icon={Building2} />
          <StatsCard title="Active Members" value="89" icon={Users} trend="59% capacity" trendUp={true} />
          <StatsCard title="Active Challenges" value="2" icon={Trophy} />
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <img src={gymImage} alt="Gym" className="w-24 h-24 rounded-lg object-cover" />
              <div className="flex-1">
                <CardTitle className="text-2xl mb-1">Elite Fitness Center</CardTitle>
                <p className="text-muted-foreground">123 Main Street, Downtown</p>
              </div>
              <Button data-testid="button-edit-gym">
                Edit Details
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
            <h2 className="text-2xl font-semibold">My Challenges</h2>
            <Button data-testid="button-create-challenge">
              <Plus className="w-4 h-4 mr-2" />
              Create Challenge
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
