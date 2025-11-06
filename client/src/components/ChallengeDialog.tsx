import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateChallenge } from '@/hooks/useChallenges';
import { Plus } from 'lucide-react';

type ChallengeDialogProps = {
  creatorId: string;
  gymId?: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
};

export function ChallengeDialog({ creatorId, gymId, onSuccess, trigger }: ChallengeDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    creatorId,
    gymId: gymId || '',
    title: '',
    description: '',
    difficulty: 'medium' as 'easy' | 'medium' | 'hard',
    durationDays: 30,
    objectives: {} as Record<string, any>,
    exerciseIds: [] as string[],
    imageUrl: '',
  });

  const [objectivesText, setObjectivesText] = useState('');

  const createChallenge = useCreateChallenge();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let objectives = {};
    try {
      if (objectivesText) {
        objectives = JSON.parse(objectivesText);
      }
    } catch (error) {
      objectives = { description: objectivesText };
    }

    const challengeData = {
      ...formData,
      objectives,
      gymId: formData.gymId || undefined,
    };

    try {
      await createChallenge.mutateAsync(challengeData);
      setOpen(false);
      onSuccess?.();
      
      setFormData({
        creatorId,
        gymId: gymId || '',
        title: '',
        description: '',
        difficulty: 'medium',
        durationDays: 30,
        objectives: {},
        exerciseIds: [],
        imageUrl: '',
      });
      setObjectivesText('');
    } catch (error) {
      console.error('Error creating challenge:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Créer un Défi
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Créer un Nouveau Défi</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titre du Défi *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez le défi en détail..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="difficulty">Difficulté *</Label>
            <Select
              value={formData.difficulty}
              onValueChange={(value: any) => setFormData({ ...formData, difficulty: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Facile</SelectItem>
                <SelectItem value="medium">Moyen</SelectItem>
                <SelectItem value="hard">Difficile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="duration">Durée (en jours) *</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              value={formData.durationDays}
              onChange={(e) => setFormData({ ...formData, durationDays: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="objectives">Objectifs</Label>
            <Textarea
              id="objectives"
              value={objectivesText}
              onChange={(e) => setObjectivesText(e.target.value)}
              placeholder="Ex: 100 pompes, 50 squats, 10km de course"
              rows={2}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Entrez une description simple ou un JSON valide
            </p>
          </div>

          <div>
            <Label htmlFor="imageUrl">URL de l'Image</Label>
            <Input
              id="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Annuler
            </Button>
            <Button type="submit" disabled={createChallenge.isPending}>
              {createChallenge.isPending ? 'Création...' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
