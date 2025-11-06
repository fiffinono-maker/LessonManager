import { db } from "./db";
import { 
  users, gyms, exercises, challenges, challengeParticipants, 
  badges, userBadges, trainingSessions, userPoints,
  type User, type InsertUser, type Gym, type InsertGym, 
  type Exercise, type InsertExercise, type Challenge, type InsertChallenge,
  type Badge, type InsertBadge, type TrainingSession, type InsertTrainingSession
} from "@shared/schema";
import { eq, and, desc, sql } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserStatus(id: string, isActive: boolean): Promise<void>;
  deleteUser(id: string): Promise<void>;
  getAllUsers(): Promise<User[]>;
  
  getGym(id: string): Promise<Gym | undefined>;
  getGymsByOwner(ownerId: string): Promise<Gym[]>;
  getGymsByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<Gym[]>;
  getAllGyms(): Promise<Gym[]>;
  createGym(gym: InsertGym): Promise<Gym>;
  updateGym(id: string, gym: Partial<InsertGym>): Promise<void>;
  updateGymStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<void>;
  deleteGym(id: string): Promise<void>;
  
  getExercise(id: string): Promise<Exercise | undefined>;
  getAllExercises(): Promise<Exercise[]>;
  createExercise(exercise: InsertExercise): Promise<Exercise>;
  updateExercise(id: string, exercise: Partial<InsertExercise>): Promise<void>;
  deleteExercise(id: string): Promise<void>;
  
  getChallenge(id: string): Promise<Challenge | undefined>;
  getChallengesByCreator(creatorId: string): Promise<Challenge[]>;
  getChallengesByStatus(status: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<Challenge[]>;
  getAllChallenges(): Promise<Challenge[]>;
  createChallenge(challenge: InsertChallenge): Promise<Challenge>;
  updateChallengeStatus(id: string, status: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<void>;
  deleteChallenge(id: string): Promise<void>;
  
  joinChallenge(challengeId: string, userId: string): Promise<void>;
  getChallengeParticipants(challengeId: string): Promise<number>;
  getUserChallenges(userId: string): Promise<Challenge[]>;
  
  getBadge(id: string): Promise<Badge | undefined>;
  getAllBadges(): Promise<Badge[]>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  deleteBadge(id: string): Promise<void>;
  awardBadge(userId: string, badgeId: string): Promise<void>;
  getUserBadges(userId: string): Promise<Badge[]>;
  
  createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession>;
  getUserTrainingSessions(userId: string): Promise<TrainingSession[]>;
  
  getUserPoints(userId: string): Promise<number>;
  updateUserPoints(userId: string, points: number): Promise<void>;
  getLeaderboard(limit: number): Promise<Array<{ userId: string; totalPoints: number; rank: number }>>;
}

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    await db.insert(userPoints).values({ userId: result[0].id, totalPoints: 0 });
    return result[0];
  }

  async updateUserStatus(id: string, isActive: boolean): Promise<void> {
    await db.update(users).set({ isActive }).where(eq(users.id, id));
  }

  async deleteUser(id: string): Promise<void> {
    await db.delete(users).where(eq(users.id, id));
  }

  async getAllUsers(): Promise<User[]> {
    return db.select().from(users);
  }

  async getGym(id: string): Promise<Gym | undefined> {
    const result = await db.select().from(gyms).where(eq(gyms.id, id));
    return result[0];
  }

  async getGymsByOwner(ownerId: string): Promise<Gym[]> {
    return db.select().from(gyms).where(eq(gyms.ownerId, ownerId));
  }

  async getGymsByStatus(status: 'pending' | 'approved' | 'rejected'): Promise<Gym[]> {
    return db.select().from(gyms).where(eq(gyms.status, status));
  }

  async getAllGyms(): Promise<Gym[]> {
    return db.select().from(gyms);
  }

  async createGym(gym: InsertGym): Promise<Gym> {
    const result = await db.insert(gyms).values(gym).returning();
    return result[0];
  }

  async updateGym(id: string, gym: Partial<InsertGym>): Promise<void> {
    await db.update(gyms).set(gym).where(eq(gyms.id, id));
  }

  async updateGymStatus(id: string, status: 'pending' | 'approved' | 'rejected'): Promise<void> {
    await db.update(gyms).set({ status }).where(eq(gyms.id, id));
  }

  async deleteGym(id: string): Promise<void> {
    await db.delete(gyms).where(eq(gyms.id, id));
  }

  async getExercise(id: string): Promise<Exercise | undefined> {
    const result = await db.select().from(exercises).where(eq(exercises.id, id));
    return result[0];
  }

  async getAllExercises(): Promise<Exercise[]> {
    return db.select().from(exercises);
  }

  async createExercise(exercise: InsertExercise): Promise<Exercise> {
    const result = await db.insert(exercises).values(exercise).returning();
    return result[0];
  }

  async updateExercise(id: string, exercise: Partial<InsertExercise>): Promise<void> {
    await db.update(exercises).set(exercise).where(eq(exercises.id, id));
  }

  async deleteExercise(id: string): Promise<void> {
    await db.delete(exercises).where(eq(exercises.id, id));
  }

  async getChallenge(id: string): Promise<Challenge | undefined> {
    const result = await db.select().from(challenges).where(eq(challenges.id, id));
    return result[0];
  }

  async getChallengesByCreator(creatorId: string): Promise<Challenge[]> {
    return db.select().from(challenges).where(eq(challenges.creatorId, creatorId));
  }

  async getChallengesByStatus(status: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<Challenge[]> {
    return db.select().from(challenges).where(eq(challenges.status, status));
  }

  async getAllChallenges(): Promise<Challenge[]> {
    return db.select().from(challenges);
  }

  async createChallenge(challenge: InsertChallenge): Promise<Challenge> {
    const result = await db.insert(challenges).values(challenge).returning();
    return result[0];
  }

  async updateChallengeStatus(id: string, status: 'draft' | 'active' | 'completed' | 'cancelled'): Promise<void> {
    await db.update(challenges).set({ status }).where(eq(challenges.id, id));
  }

  async deleteChallenge(id: string): Promise<void> {
    await db.delete(challenges).where(eq(challenges.id, id));
  }

  async joinChallenge(challengeId: string, userId: string): Promise<void> {
    await db.insert(challengeParticipants).values({ challengeId, userId });
  }

  async getChallengeParticipants(challengeId: string): Promise<number> {
    const result = await db.select({ count: sql<number>`count(*)` })
      .from(challengeParticipants)
      .where(eq(challengeParticipants.challengeId, challengeId));
    return Number(result[0].count);
  }

  async getUserChallenges(userId: string): Promise<Challenge[]> {
    const result = await db.select({ challenge: challenges })
      .from(challengeParticipants)
      .innerJoin(challenges, eq(challengeParticipants.challengeId, challenges.id))
      .where(eq(challengeParticipants.userId, userId));
    return result.map(r => r.challenge);
  }

  async getBadge(id: string): Promise<Badge | undefined> {
    const result = await db.select().from(badges).where(eq(badges.id, id));
    return result[0];
  }

  async getAllBadges(): Promise<Badge[]> {
    return db.select().from(badges);
  }

  async createBadge(badge: InsertBadge): Promise<Badge> {
    const result = await db.insert(badges).values(badge).returning();
    return result[0];
  }

  async deleteBadge(id: string): Promise<void> {
    await db.delete(badges).where(eq(badges.id, id));
  }

  async awardBadge(userId: string, badgeId: string): Promise<void> {
    await db.insert(userBadges).values({ userId, badgeId });
  }

  async getUserBadges(userId: string): Promise<Badge[]> {
    const result = await db.select({ badge: badges })
      .from(userBadges)
      .innerJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId));
    return result.map(r => r.badge);
  }

  async createTrainingSession(session: InsertTrainingSession): Promise<TrainingSession> {
    const result = await db.insert(trainingSessions).values(session).returning();
    const points = Math.floor(session.caloriesBurned / 10);
    await this.updateUserPoints(session.userId, points);
    return result[0];
  }

  async getUserTrainingSessions(userId: string): Promise<TrainingSession[]> {
    return db.select().from(trainingSessions).where(eq(trainingSessions.userId, userId)).orderBy(desc(trainingSessions.createdAt));
  }

  async getUserPoints(userId: string): Promise<number> {
    const result = await db.select().from(userPoints).where(eq(userPoints.userId, userId));
    return result[0]?.totalPoints || 0;
  }

  async updateUserPoints(userId: string, points: number): Promise<void> {
    const current = await db.select().from(userPoints).where(eq(userPoints.userId, userId));
    if (current.length === 0) {
      await db.insert(userPoints).values({ userId, totalPoints: points });
    } else {
      await db.update(userPoints)
        .set({ totalPoints: current[0].totalPoints + points, updatedAt: new Date() })
        .where(eq(userPoints.userId, userId));
    }
  }

  async getLeaderboard(limit: number): Promise<Array<{ userId: string; totalPoints: number; rank: number }>> {
    const result = await db.select()
      .from(userPoints)
      .orderBy(desc(userPoints.totalPoints))
      .limit(limit);
    
    return result.map((entry, index) => ({
      userId: entry.userId,
      totalPoints: entry.totalPoints,
      rank: index + 1
    }));
  }
}

export const storage = new DbStorage();
