import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateBadge } from '@/hooks/useBadges';
import { Plus, Trophy, Star, Medal, Award as AwardIcon, Flame, Target } from 'lucide-react';
import type { Badge } from '@shared/schema';

type BadgeDialogProps = {
  badge?: Badge;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
};

const iconOptions = [
  { value: 'trophy', label: 'Trophée', Icon: Trophy },
  { value: 'star', label: 'Étoile', Icon: Star },
  { value: 'medal', label: 'Médaille', Icon: Medal },
  { value: 'award', label: 'Récompense', Icon: AwardIcon },
  { value: 'flame', label: 'Flamme', Icon: Flame },
  { value: 'target', label: 'Cible', Icon: Target },
];

export function BadgeDialog({ badge, onSuccess, trigger }: BadgeDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: badge?.name || '',
    description: badge?.description || '',
    icon: badge?.icon || 'trophy',
    rules: badge?.rules ? JSON.stringify(badge.rules, null, 2) : '{\n  "type": "challenges_completed",\n  "count": 1\n}',
  });

  const createBadge = useCreateBadge();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let rules = {};
    try {
      rules = JSON.parse(formData.rules);
    } catch (error) {
      alert('Format JSON invalide pour les règles. Veuillez corriger.');
      return;
    }

    const badgeData = {
      name: formData.name,
      description: formData.description,
      icon: formData.icon,
      rules,
    };

    try {
      await createBadge.mutateAsync(badgeData);
      setOpen(false);
      onSuccess?.();

      if (!badge) {
        setFormData({
          name: '',
          description: '',
          icon: 'trophy',
          rules: '{\n  "type": "challenges_completed",\n  "count": 1\n}',
        });
      }
    } catch (error) {
      console.error('Error creating badge:', error);
    }
  };

  const selectedIcon = iconOptions.find(opt => opt.value === formData.icon);
  const IconComponent = selectedIcon?.Icon || Trophy;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-create-badge">
            <Plus className="w-4 h-4 mr-2" />
            Créer un Badge
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]" data-testid="dialog-badge">
        <DialogHeader>
          <DialogTitle>{badge ? 'Modifier le Badge' : 'Créer un Badge'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom du Badge</Label>
            <Input
              id="name"
              data-testid="input-badge-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              placeholder="ex: Premier Pas, Régularité..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              data-testid="input-badge-description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
              rows={3}
              placeholder="Décrivez comment obtenir ce badge..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icône</Label>
            <Select
              value={formData.icon}
              onValueChange={(value) => setFormData({ ...formData, icon: value })}
            >
              <SelectTrigger id="icon" data-testid="select-badge-icon">
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{selectedIcon?.label}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {iconOptions.map(({ value, label, Icon }) => (
                  <SelectItem key={value} value={value}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      <span>{label}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules">Règles (JSON)</Label>
            <Textarea
              id="rules"
              data-testid="input-badge-rules"
              value={formData.rules}
              onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
              required
              rows={6}
              className="font-mono text-sm"
              placeholder='{"type": "challenges_completed", "count": 1}'
            />
            <p className="text-xs text-muted-foreground">
              Exemples de règles : challenges_completed (nombre de défis), training_streak (jours consécutifs), 
              total_points (points totaux)
            </p>
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
              data-testid="button-submit-badge"
              disabled={createBadge.isPending}
            >
              {badge ? 'Mettre à jour' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
