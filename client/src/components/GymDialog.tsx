import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateGym, useUpdateGym } from '@/hooks/useGyms';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient, apiRequest } from '@/lib/queryClient';
import { Plus } from 'lucide-react';
import type { Equipment } from '@shared/schema';

type GymData = {
  id?: string;
  ownerId: string;
  name: string;
  address: string;
  phone: string;
  description: string;
  capacity: number;
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
    imageUrl: gym?.imageUrl || '',
  });
  
  const [selectedEquipment, setSelectedEquipment] = useState<Set<string>>(new Set());

  const { data: allEquipment = [] } = useQuery<Equipment[]>({
    queryKey: ['/api/equipment'],
  });

  const { data: gymEquipment = [] } = useQuery<Equipment[]>({
    queryKey: ['/api/equipment/gym', gym?.id],
    enabled: !!gym?.id,
  });

  useEffect(() => {
    if (gymEquipment.length > 0) {
      setSelectedEquipment(new Set(gymEquipment.map(e => e.id)));
    }
  }, [gymEquipment]);

  const createGym = useCreateGym();
  const updateGym = useUpdateGym();

  const addGymEquipmentMutation = useMutation({
    mutationFn: async (data: { gymId: string; equipmentId: string }) => {
      const res = await apiRequest('POST', '/api/equipment/gym', data);
      return await res.json();
    },
  });

  const removeGymEquipmentMutation = useMutation({
    mutationFn: async (data: { gymId: string; equipmentId: string }) => {
      const res = await apiRequest('DELETE', `/api/equipment/gym/${data.gymId}/${data.equipmentId}`);
      return await res.json();
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let gymId = gym?.id;
      
      if (gym?.id) {
        await updateGym.mutateAsync({ id: gym.id, data: formData });
      } else {
        const newGym = await createGym.mutateAsync(formData);
        gymId = newGym.id;
      }

      if (gymId) {
        const currentEquipmentIds = new Set(gymEquipment.map(e => e.id));
        const selectedEquipmentIds = selectedEquipment;

        const toAdd = Array.from(selectedEquipmentIds).filter(id => !currentEquipmentIds.has(id));
        const toRemove = Array.from(currentEquipmentIds).filter(id => !selectedEquipmentIds.has(id));

        for (const equipmentId of toRemove) {
          await removeGymEquipmentMutation.mutateAsync({ gymId, equipmentId });
        }

        for (const equipmentId of toAdd) {
          await addGymEquipmentMutation.mutateAsync({ gymId, equipmentId });
        }

        queryClient.invalidateQueries({ queryKey: ['/api/equipment/gym', gymId] });
      }

      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('Error saving gym:', error);
    }
  };

  const toggleEquipment = (equipmentId: string) => {
    const newSelected = new Set(selectedEquipment);
    if (newSelected.has(equipmentId)) {
      newSelected.delete(equipmentId);
    } else {
      newSelected.add(equipmentId);
    }
    setSelectedEquipment(newSelected);
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
            <Label>Équipements Disponibles</Label>
            <div className="border rounded-md p-4 space-y-2 max-h-40 overflow-y-auto">
              {allEquipment.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucun équipement disponible. Contactez l'administrateur.</p>
              ) : (
                allEquipment.map((equipment) => (
                  <div key={equipment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`equipment-${equipment.id}`}
                      checked={selectedEquipment.has(equipment.id)}
                      onCheckedChange={() => toggleEquipment(equipment.id)}
                    />
                    <label
                      htmlFor={`equipment-${equipment.id}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                    >
                      {equipment.name}
                      {equipment.description && (
                        <span className="text-muted-foreground ml-1">- {equipment.description}</span>
                      )}
                    </label>
                  </div>
                ))
              )}
            </div>
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
