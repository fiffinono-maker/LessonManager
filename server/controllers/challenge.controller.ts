import { Router, type Request, type Response } from 'express';
import { ChallengeService } from '../services';
import { insertChallengeSchema } from '@shared/schema';

export class ChallengeController {
  constructor(private readonly challengeService: ChallengeService) {}

  buildRouter(): Router {
    const router = Router();

    router.get('/', async (req: Request, res: Response) => {
      try {
        const { status, gymId } = req.query;
        let challenges;
        if (gymId) {
          challenges = await this.challengeService.getChallengesByGym(gymId as string);
        } else {
          challenges = await this.challengeService.getChallenges(status as any);
        }
        res.json(challenges);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.get('/:id', async (req: Request, res: Response) => {
      try {
        const challenge = await this.challengeService.getChallenge(req.params.id);
        res.json(challenge);
      } catch (error) {
        res.status(404).json({ error: (error as Error).message });
      }
    });

    router.get('/:id/participants', async (req: Request, res: Response) => {
      try {
        const count = await this.challengeService.getChallengeParticipants(req.params.id);
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    router.post('/', async (req: Request, res: Response) => {
      try {
        const challengeData = insertChallengeSchema.parse(req.body);
        const challenge = await this.challengeService.createChallenge(challengeData);
        res.status(201).json(challenge);
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.post('/:id/join', async (req: Request, res: Response) => {
      try {
        const { userId } = req.body;
        await this.challengeService.joinChallenge(req.params.id, userId);
        res.json({ message: 'Joined challenge successfully' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.patch('/:id/status', async (req: Request, res: Response) => {
      try {
        const { status } = req.body;
        await this.challengeService.updateChallengeStatus(req.params.id, status);
        res.json({ message: 'Challenge status updated' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    router.delete('/:id', async (req: Request, res: Response) => {
      try {
        await this.challengeService.deleteChallenge(req.params.id);
        res.json({ message: 'Challenge deleted' });
      } catch (error) {
        res.status(400).json({ error: (error as Error).message });
      }
    });

    return router;
  }
}
