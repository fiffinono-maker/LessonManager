import { Router, type Request, type Response } from 'express';
import { BadgeService } from '../services';
import { insertBadgeSchema } from '@shared/schema';

export class BadgeController {
  constructor(private readonly badgeService: BadgeService) {}

  buildRouter(): Router {
    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
      try {
        const badges = await this.badgeService.getBadges();
        res.json(badges);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id', async (req: Request, res: Response) => {
      try {
        const badge = await this.badgeService.getBadge(req.params.id);
        res.json(badge);
      } catch (error) {
        res.status(404).json({ error: (error as Error).message });
      }
    });

    router.post('/', async (req: Request, res: Response) => {
      try {
        const badgeData = insertBadgeSchema.parse(req.body);
        const badge = await this.badgeService.createBadge(badgeData);
        res.status(201).json(badge);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.post('/award', async (req: Request, res: Response) => {
      try {
        const { userId, badgeId } = req.body;
        await this.badgeService.awardBadge(userId, badgeId);
        res.json({ message: 'Badge awarded successfully' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        await this.badgeService.deleteBadge(req.params.id);
        res.json({ message: 'Badge deleted' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    return router;
  }
}
