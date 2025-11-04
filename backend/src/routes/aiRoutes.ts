import { Router } from 'express';
import AIController from '../controllers/aiController';

const router = Router();
const aiController = new AIController();

const setAiRoutes = (app) => {
    router.post('/recommendations', aiController.getRecommendations);
    app.use('/api/ai', router);
};

export default setAiRoutes;