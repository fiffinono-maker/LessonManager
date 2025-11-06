import type { Express } from "express";
import { createServer, type Server } from "http";
import {
  AuthController,
  GymController,
  ExerciseController,
  ChallengeController,
  BadgeController,
  UserController,
  TrainingController
} from "./controllers";
import {
  AuthService,
  GymService,
  ExerciseService,
  ChallengeService,
  BadgeService,
  UserService,
  TrainingService
} from "./services";

export async function registerRoutes(app: Express): Promise<Server> {
  const authService = new AuthService();
  const gymService = new GymService();
  const exerciseService = new ExerciseService();
  const challengeService = new ChallengeService();
  const badgeService = new BadgeService();
  const userService = new UserService();
  const trainingService = new TrainingService();

  const authController = new AuthController(authService);
  const gymController = new GymController(gymService);
  const exerciseController = new ExerciseController(exerciseService);
  const challengeController = new ChallengeController(challengeService);
  const badgeController = new BadgeController(badgeService);
  const userController = new UserController(userService, badgeService, challengeService, trainingService);
  const trainingController = new TrainingController(trainingService);

  app.use('/api/auth', authController.buildRouter());
  app.use('/api/gyms', gymController.buildRouter());
  app.use('/api/exercises', exerciseController.buildRouter());
  app.use('/api/challenges', challengeController.buildRouter());
  app.use('/api/badges', badgeController.buildRouter());
  app.use('/api/users', userController.buildRouter());
  app.use('/api/training', trainingController.buildRouter());

  const httpServer = createServer(app);

  return httpServer;
}
