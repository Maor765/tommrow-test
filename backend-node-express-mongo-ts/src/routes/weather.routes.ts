import { Router } from 'express';
import { getWeather } from '../controllers/weather.controller';

const router = Router();

router.get('/realtime', getWeather);

export default router;
