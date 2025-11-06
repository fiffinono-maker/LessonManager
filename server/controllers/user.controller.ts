import { Router, type Request, type Response } from 'express';
import { UserService, BadgeService, ChallengeService, TrainingService } from '../services';

export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly badgeService: BadgeService,
    private readonly challengeService: ChallengeService,
    private readonly trainingService: TrainingService
  ) {}

  buildRouter(): Router {
    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
      try {
        const users = await this.userService.getUsers();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id', async (req: Request, res: Response) => {
      try {
        const user = await this.userService.getUser(req.params.id);
        res.json(user);
      } catch (error) {
        res.status(404).json({ error: (error as Error).message });
      }
    });

    router.get('/:id/badges', async (req: Request, res: Response) => {
      try {
        const badges = await this.badgeService.getUserBadges(req.params.id);
        res.json(badges);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id/challenges', async (req: Request, res: Response) => {
      try {
        const challenges = await this.challengeService.getUserChallenges(req.params.id);
        res.json(challenges);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id/sessions', async (req: Request, res: Response) => {
      try {
        const sessions = await this.trainingService.getUserSessions(req.params.id);
        res.json(sessions);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id/points', async (req: Request, res: Response) => {
      try {
        const points = await this.trainingService.getUserPoints(req.params.id);
        res.json({ points });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.patch('/:id/deactivate', async (req: Request, res: Response) => {
      try {
        await this.userService.deactivateUser(req.params.id);
        res.json({ message: 'User deactivated' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.patch('/:id/activate', async (req: Request, res: Response) => {
      try {
        await this.userService.activateUser(req.params.id);
        res.json({ message: 'User activated' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        await this.userService.deleteUser(req.params.id);
        res.json({ message: 'User deleted' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    return router;
  }
}
