import { storage } from '../storage';
import type { InsertTrainingSession, TrainingSession } from '@shared/schema';

export class TrainingService {
  async createSession(sessionData: InsertTrainingSession): Promise<TrainingSession> {
    return storage.createTrainingSession(sessionData);
  }

  async getUserSessions(userId: string): Promise<TrainingSession[]> {
    return storage.getUserTrainingSessions(userId);
  }

  async getUserPoints(userId: string): Promise<number> {
    return storage.getUserPoints(userId);
  }

  async getLeaderboard(limit: number = 10): Promise<Array<{ userId: string; totalPoints: number; rank: number }>> {
    return storage.getLeaderboard(limit);
  }
}
