import { storage } from '../storage';
import type { InsertGym, Gym } from '@shared/schema';

export class GymService {
  async getGyms(status?: 'pending' | 'approved' | 'rejected'): Promise<Gym[]> {
    if (status) {
      return storage.getGymsByStatus(status);
    }
    return storage.getAllGyms();
  }

  async getGym(id: string): Promise<Gym> {
    const gym = await storage.getGym(id);
    if (!gym) {
      throw new Error('Gym not found');
    }
    return gym;
  }

  async getGymsByOwner(ownerId: string): Promise<Gym[]> {
    return storage.getGymsByOwner(ownerId);
  }

  async createGym(gymData: InsertGym): Promise<Gym> {
    return storage.createGym(gymData);
  }

  async updateGym(id: string, gymData: Partial<InsertGym>): Promise<void> {
    await storage.updateGym(id, gymData);
  }

  async approveGym(id: string): Promise<void> {
    await storage.updateGymStatus(id, 'approved');
  }

  async rejectGym(id: string): Promise<void> {
    await storage.updateGymStatus(id, 'rejected');
  }

  async deleteGym(id: string): Promise<void> {
    await storage.deleteGym(id);
  }
}
