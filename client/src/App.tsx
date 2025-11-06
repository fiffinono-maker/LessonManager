import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import Landing from "@/pages/landing";
import AuthPage from "@/pages/auth";
import AdminDashboard from "@/pages/admin-dashboard";
import AdminExercises from "@/pages/admin/exercises";
import AdminBadges from "@/pages/admin/badges";
import AdminGyms from "@/pages/admin/gyms";
import GymOwnerDashboard from "@/pages/gym-owner-dashboard";
import ClientDashboard from "@/pages/client-dashboard";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/exercises" component={AdminExercises} />
      <Route path="/admin/badges" component={AdminBadges} />
      <Route path="/admin/gyms" component={AdminGyms} />
      <Route path="/gym-owner" component={GymOwnerDashboard} />
      <Route path="/client" component={ClientDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
