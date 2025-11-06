import { storage } from '../storage';
import type { User } from '@shared/schema';

export class UserService {
  async getUsers(): Promise<User[]> {
    return storage.getAllUsers();
  }

  async getUser(id: string): Promise<User> {
    const user = await storage.getUser(id);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async deactivateUser(id: string): Promise<void> {
    await storage.updateUserStatus(id, false);
  }

  async activateUser(id: string): Promise<void> {
    await storage.updateUserStatus(id, true);
  }

  async deleteUser(id: string): Promise<void> {
    await storage.deleteUser(id);
  }
}
