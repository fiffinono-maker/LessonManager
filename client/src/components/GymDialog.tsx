import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateGym, useUpdateGym } from '@/hooks/useGyms';
import { Plus } from 'lucide-react';

type GymData = {
  id?: string;
  ownerId: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  capacity: number;
  equipment: string[];
  imageUrl?: string;
};

type GymDialogProps = {
  gym?: GymData;
  ownerId: string;
  onSuccess?: () => void;
  trigger?: React.ReactNode;
};

export function GymDialog({ gym, ownerId, onSuccess, trigger }: GymDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<GymData>({
    id: gym?.id,
    ownerId: ownerId,
    name: gym?.name || '',
    address: gym?.address || '',
    phone: gym?.phone || '',
    description: gym?.description || '',
    capacity: gym?.capacity || 50,
    equipment: gym?.equipment || [],
    imageUrl: gym?.imageUrl || '',
  });
  
  const [equipmentInput, setEquipmentInput] = useState(formData.equipment.join(', '));

  const createGym = useCreateGym();
  const updateGym = useUpdateGym();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const equipmentArray = equipmentInput.split(',').map(item => item.trim()).filter(Boolean);
    const gymData = {
      ...formData,
      equipment: equipmentArray,
    };

    try {
      if (gym?.id) {
        await updateGym.mutateAsync({ id: gym.id, data: gymData });
      } else {
        await createGym.mutateAsync(gymData);
      }
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving gym:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            {gym ? 'Modifier' : 'Créer une Salle'}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{gym ? 'Modifier la Salle' : 'Créer une Nouvelle Salle'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom de la Salle *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Adresse *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <Label htmlFor="capacity">Capacité d'Accueil *</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Décrivez les installations et activités proposées..."
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="equipment">Équipements (séparés par des virgules)</Label>
            <Input
              id="equipment"
              value={equipmentInput}
              onChange={(e) => setEquipmentInput(e.target.value)}
              placeholder="Treadmills, Free Weights, Yoga Studio"
            />
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
            <Button type="submit" disabled={createGym.isPending || updateGym.isPending}>
              {createGym.isPending || updateGym.isPending ? 'Enregistrement...' : 'Enregistrer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
