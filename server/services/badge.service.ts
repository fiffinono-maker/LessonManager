import { storage } from '../storage';
import type { InsertBadge, Badge } from '@shared/schema';

export class BadgeService {
  async getBadges(): Promise<Badge[]> {
    return storage.getAllBadges();
  }

  async getBadge(id: string): Promise<Badge> {
    const badge = await storage.getBadge(id);
    if (!badge) {
      throw new Error('Badge not found');
    }
    return badge;
  }

  async createBadge(badgeData: InsertBadge): Promise<Badge> {
    return storage.createBadge(badgeData);
  }

  async deleteBadge(id: string): Promise<void> {
    await storage.deleteBadge(id);
  }

  async awardBadge(userId: string, badgeId: string): Promise<void> {
    await storage.awardBadge(userId, badgeId);
  }

  async getUserBadges(userId: string): Promise<Badge[]> {
    return storage.getUserBadges(userId);
  }
}
