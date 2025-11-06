import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/hooks/useAuth';
import { useLogin, useRegister } from '@/hooks/useAuth';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { AlertCircle } from 'lucide-react';
import type { Gym } from '@shared/schema';

export default function AuthPage() {
  const { setAuth } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'client' as 'super_admin' | 'gym_owner' | 'client',
    gymId: '',
  });

  const { data: approvedGyms = [], isLoading: gymsLoading } = useQuery<Gym[]>({
    queryKey: ['/api/gyms?status=approved'],
    enabled: true,
  });

  const loginMutation = useLogin();
  const registerMutation = useRegister();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await loginMutation.mutateAsync(loginData);
      setAuth(result.user, result.accessToken);
      
      toast({
        title: 'Connexion réussie',
        description: `Bienvenue ${result.user.firstName}!`,
      });

      // Navigate based on role
      if (result.user.role === 'super_admin') {
        navigate('/admin');
      } else if (result.user.role === 'gym_owner') {
        navigate('/gym-owner');
      } else {
        navigate('/client');
      }
    } catch (error: any) {
      toast({
        title: 'Erreur de connexion',
        description: error.message || 'Email ou mot de passe incorrect',
        variant: 'destructive',
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerData.role === 'client' && !registerData.gymId) {
      toast({
        title: 'Salle requise',
        description: 'Veuillez sélectionner une salle de sport',
        variant: 'destructive',
      });
      return;
    }

    if (registerData.role === 'client' && approvedGyms.length === 0) {
      toast({
        title: 'Aucune salle disponible',
        description: 'Impossible de s\'inscrire car aucune salle n\'est approuvée',
        variant: 'destructive',
      });
      return;
    }

    try {
      const dataToSubmit = registerData.role === 'client' 
        ? registerData 
        : { ...registerData, gymId: undefined };
      
      const result = await registerMutation.mutateAsync(dataToSubmit);
      setAuth(result.user, result.accessToken);
      
      toast({
        title: 'Inscription réussie',
        description: `Bienvenue ${result.user.firstName}!`,
      });

      // Navigate based on role
      if (result.user.role === 'super_admin') {
        navigate('/admin');
      } else if (result.user.role === 'gym_owner') {
        navigate('/gym-owner');
      } else {
        navigate('/client');
      }
    } catch (error: any) {
      toast({
        title: 'Erreur d\'inscription',
        description: error.message || 'Impossible de créer le compte',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">TSPark</CardTitle>
          <CardDescription className="text-center">
            Plateforme de gestion d'entraînement fitness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" data-testid="tab-login">Connexion</TabsTrigger>
              <TabsTrigger value="register" data-testid="tab-register">Inscription</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    data-testid="input-login-email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="login-password">Mot de passe</Label>
                  <Input
                    id="login-password"
                    type="password"
                    data-testid="input-login-password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" data-testid="button-login" disabled={loginMutation.isPending}>
                  {loginMutation.isPending ? 'Connexion...' : 'Se connecter'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first-name">Prénom</Label>
                    <Input
                      id="first-name"
                      data-testid="input-first-name"
                      value={registerData.firstName}
                      onChange={(e) => setRegisterData({ ...registerData, firstName: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="last-name">Nom</Label>
                    <Input
                      id="last-name"
                      data-testid="input-last-name"
                      value={registerData.lastName}
                      onChange={(e) => setRegisterData({ ...registerData, lastName: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    data-testid="input-register-email"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="register-password">Mot de passe</Label>
                  <Input
                    id="register-password"
                    type="password"
                    data-testid="input-register-password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="role">Rôle</Label>
                  <Select 
                    value={registerData.role} 
                    onValueChange={(value: any) => setRegisterData({ ...registerData, role: value, gymId: '' })}
                  >
                    <SelectTrigger data-testid="select-role">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client</SelectItem>
                      <SelectItem value="gym_owner">Propriétaire de Salle</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {registerData.role === 'client' && (
                  <div>
                    <Label htmlFor="gym">Salle de Sport *</Label>
                    {gymsLoading ? (
                      <p className="text-sm text-muted-foreground">Chargement des salles...</p>
                    ) : approvedGyms.length === 0 ? (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Aucune salle de sport n'est actuellement disponible. Vous ne pouvez pas vous inscrire en tant que client pour le moment.
                        </AlertDescription>
                      </Alert>
                    ) : (
                      <Select 
                        value={registerData.gymId} 
                        onValueChange={(value) => setRegisterData({ ...registerData, gymId: value })}
                      >
                        <SelectTrigger data-testid="select-gym">
                          <SelectValue placeholder="Sélectionnez votre salle" />
                        </SelectTrigger>
                        <SelectContent>
                          {approvedGyms.map((gym) => (
                            <SelectItem key={gym.id} value={gym.id}>
                              {gym.name} - {gym.address}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                <Button 
                  type="submit" 
                  className="w-full" 
                  data-testid="button-register" 
                  disabled={
                    registerMutation.isPending || 
                    (registerData.role === 'client' && approvedGyms.length === 0)
                  }
                >
                  {registerMutation.isPending ? 'Inscription...' : 'S\'inscrire'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
