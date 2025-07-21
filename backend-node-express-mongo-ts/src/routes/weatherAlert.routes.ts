import { Router } from 'express';
import { createAlert, getAlerts } from '../controllers/weatherAlert.controller';

const router = Router();

router.post('/', createAlert); // POST /api/alerts
router.get('/', getAlerts); // GET /api/alerts

export default router;
