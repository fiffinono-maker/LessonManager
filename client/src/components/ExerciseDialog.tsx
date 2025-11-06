import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateExercise, useUpdateExercise } from '@/hooks/useExercises';
import { Plus, Edit } from 'lucide-react';
import type { Exercise } from '@shared/schema';

type ExerciseDialogProps = {
  exercise?: Exercise;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
};

export function ExerciseDialog({ exercise, onSuccess, trigger }: ExerciseDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: exercise?.name || '',
    description: exercise?.description || '',
    targetMuscles: exercise?.targetMuscles?.join(', ') || '',
  });

  const createExercise = useCreateExercise();
  const updateExercise = useUpdateExercise();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const targetMusclesArray = formData.targetMuscles
      .split(',')
      .map(m => m.trim())
      .filter(m => m.length > 0);

    const exerciseData = {
      name: formData.name,
      description: formData.description,
      targetMuscles: targetMusclesArray,
    };

    try {
      if (exercise) {
        await updateExercise.mutateAsync({ id: exercise.id, data: exerciseData });
      } else {
        await createExercise.mutateAsync(exerciseData);
      }
      setOpen(false);
      onSuccess?.();

      if (!exercise) {
        setFormData({
          name: '',
          description: '',
          targetMuscles: '',
        });
      }
    } catch (error) {
      console.error('Error saving exercise:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-create-exercise">
            <Plus className="w-4 h-4 mr-2" />
            {exercise ? 'Modifier' : 'Créer un Exercice'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]" data-testid="dialog-exercise">
        <DialogHeader>
          <DialogTitle>{exercise ? 'Modifier l\'Exercice' : 'Créer un Exercice'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom de l'Exercice</Label>
            <Input
              id="name"
              data-testid="input-exercise-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="ex: Squats, Pompes..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              data-testid="input-exercise-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={4}
              placeholder="Décrivez l'exercice, sa technique..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="targetMuscles">Muscles Ciblés (séparés par des virgules)</Label>
            <Input
              id="targetMuscles"
              data-testid="input-exercise-muscles"
              value={formData.targetMuscles}
              onChange={(e) => setFormData({ ...formData, targetMuscles: e.target.value })}
              required
              placeholder="ex: Quadriceps, Fessiers, Ischio-jambiers"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              data-testid="button-cancel"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              data-testid="button-submit-exercise"
              disabled={createExercise.isPending || updateExercise.isPending}
            >
              {exercise ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
