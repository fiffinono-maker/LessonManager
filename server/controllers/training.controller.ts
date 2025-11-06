import { Router, type Request, type Response } from 'express';
import { TrainingService } from '../services';
import { insertTrainingSessionSchema } from '@shared/schema';

export class TrainingController {
  constructor(private readonly trainingService: TrainingService) {}

  buildRouter(): Router {
    const router = Router();

    router.post('/sessions', async (req: Request, res: Response) => {
      try {
        const sessionData = insertTrainingSessionSchema.parse(req.body);
        const session = await this.trainingService.createSession(sessionData);
        res.status(201).json(session);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.get('/leaderboard', async (req: Request, res: Response) => {
      try {
        const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
        const leaderboard = await this.trainingService.getLeaderboard(limit);
        res.json(leaderboard);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    return router;
  }
}
