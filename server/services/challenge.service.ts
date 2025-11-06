import { storage } from '../storage';
import type { InsertChallenge, Challenge } from '@shared/schema';

export class ChallengeService {
  async getChallenges(status?: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<Challenge[]> {
    if (status) {
      return storage.getChallengesByStatus(status);
    }
    return storage.getAllChallenges();
  }

  async getChallenge(id: string): Promise<Challenge> {
    const challenge = await storage.getChallenge(id);
    if (!challenge) {
      throw new Error('Challenge not found');
    }
    return challenge;
  }

  async getChallengesByCreator(creatorId: string): Promise<Challenge[]> {
    return storage.getChallengesByCreator(creatorId);
  }

  async getChallengesByGym(gymId: string): Promise<Challenge[]> {
    return storage.getChallengesByGym(gymId);
  }

  async createChallenge(challengeData: InsertChallenge): Promise<Challenge> {
    return storage.createChallenge(challengeData);
  }

  async updateChallenge(id: string, challengeData: Partial<InsertChallenge>): Promise<void> {
    await storage.updateChallenge(id, challengeData);
  }

  async updateChallengeStatus(id: string, status: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<void> {
    await storage.updateChallengeStatus(id, status);
  }

  async deleteChallenge(id: string): Promise<void> {
    await storage.deleteChallenge(id);
  }

  async joinChallenge(challengeId: string, userId: string): Promise<void> {
    await storage.joinChallenge(challengeId, userId);
  }

  async getChallengeParticipants(challengeId: string): Promise<number> {
    return storage.getChallengeParticipants(challengeId);
  }

  async getUserChallenges(userId: string): Promise<Challenge[]> {
    return storage.getUserChallenges(userId);
  }
}
