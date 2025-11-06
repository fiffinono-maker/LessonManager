import Hero from "@/components/Hero";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Trophy, Users, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Landing() {
  const [, navigate] = useLocation();
  const features = [
    {
      icon: Trophy,
      title: "Rejoindre des Défis",
      description: "Participez à des défis fitness variés adaptés à vos objectifs et à votre niveau"
    },
    {
      icon: Users,
      title: "Communauté Active",
      description: "Connectez-vous avec d'autres passionnés de fitness et participez à des défis de groupe"
    },
    {
      icon: Zap,
      title: "Suivre vos Progrès",
      description: "Surveillez vos entraînements, calories brûlées et accomplissements en temps réel"
    },
    {
      icon: Shield,
      title: "Gagner des Récompenses",
      description: "Débloquez des badges et récompenses en complétant des défis et atteignant vos objectifs"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-display">Pourquoi Choisir TSPark ?</h2>
            <p className="text-xl text-muted-foreground">Tout ce dont vous avez besoin pour atteindre vos objectifs fitness</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="hover-elevate">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 font-display">Prêt à Commencer Votre Parcours ?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Rejoignez des milliers de passionnés de fitness qui transforment déjà leur vie
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg"
              data-testid="button-signup"
              onClick={() => navigate('/auth')}
            >
              S'inscrire Maintenant
            </Button>
            <Button 
              size="lg"
              variant="outline"
              data-testid="button-gym-owner"
              onClick={() => navigate('/auth')}
            >
              Je suis Propriétaire de Salle
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
