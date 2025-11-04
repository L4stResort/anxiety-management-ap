import { Request, Response } from 'express';
import { getRecommendations } from '../services/groqService';

class AIController {
    async processGAD7Results(req: Request, res: Response) {
        const { userResponses } = req.body;

        try {
            const recommendations = await getRecommendations(userResponses);
            res.status(200).json(recommendations);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching recommendations', error });
        }
    }
}

export default new AIController();