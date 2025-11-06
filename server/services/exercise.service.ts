import { storage } from '../storage';
import type { InsertExercise, Exercise } from '@shared/schema';

export class ExerciseService {
  async getExercises(): Promise<Exercise[]> {
    return storage.getAllExercises();
  }

  async getExercise(id: string): Promise<Exercise> {
    const exercise = await storage.getExercise(id);
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    return exercise;
  }

  async createExercise(exerciseData: InsertExercise): Promise<Exercise> {
    return storage.createExercise(exerciseData);
  }

  async updateExercise(id: string, exerciseData: Partial<InsertExercise>): Promise<void> {
    await storage.updateExercise(id, exerciseData);
  }

  async deleteExercise(id: string): Promise<void> {
    await storage.deleteExercise(id);
  }
}
