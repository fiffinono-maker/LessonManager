import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";
import DataTable from "@/components/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExerciseDialog } from "@/components/ExerciseDialog";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "wouter";
import { useExercises, useDeleteExercise } from "@/hooks/useExercises";
import type { Exercise } from "@shared/schema";

export default function AdminExercises() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  
  const { data: exercises = [], refetch } = useExercises();
  const deleteExercise = useDeleteExercise();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleDeleteExercise = async (exercise: Exercise) => {
    if (confirm(`Êtes-vous sûr de vouloir supprimer l'exercice "${exercise.name}"?`)) {
      await deleteExercise.mutateAsync(exercise.id);
      refetch();
    }
  };

  const exerciseColumns = [
    { key: 'name', label: 'Nom' },
    { 
      key: 'description', 
      label: 'Description',
      render: (value: string) => (
        <span className="line-clamp-2 max-w-md">{value}</span>
      )
    },
    { 
      key: 'targetMuscles', 
      label: 'Muscles Ciblés',
      render: (value: string[]) => (
        <div className="flex flex-wrap gap-1">
          {value?.slice(0, 3).map((muscle, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {muscle}
            </Badge>
          ))}
          {value?.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{value.length - 3}
            </Badge>
          )}
        </div>
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
            <h1 className="text-xl font-bold font-display">Gestion des Exercices</h1>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              Déconnexion
            </Button>
          </header>
          
          <main className="flex-1 overflow-auto">
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Types d'Exercices</h2>
                  <p className="text-muted-foreground mt-1">
                    Gérez les types d'exercices disponibles dans la plateforme
                  </p>
                </div>
                <ExerciseDialog onSuccess={refetch} />
              </div>

              <DataTable 
                columns={exerciseColumns}
                data={exercises}
                onEdit={(exercise) => {}}
                onDelete={handleDeleteExercise}
                editLabel="Modifier"
              />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
