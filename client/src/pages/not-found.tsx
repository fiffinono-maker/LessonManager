import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">Page non trouvée</p>
        <Button onClick={() => setLocation('/')} data-testid="button-go-home">
          Retour à l'accueil
        </Button>
      </div>
    </div>
  );
}
