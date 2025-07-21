import { Request, Response } from 'express';
import WeatherAlert from '../models/weatherAlert.model';

export const createAlert = async (req: Request, res: Response) => {
  try {
    const { name, description, userId, condition, location, email } = req.body;

    if (!condition || !location) {
      return res
        .status(400)
        .json({ error: 'Condition and location are required.' });
    }

    const alert = new WeatherAlert({
      name,
      description,
      userId,
      condition,
      location,
      email,
    });

    await alert.save();

    res.status(201).json(alert);
  } catch (error: any) {
    console.error('❌ Failed to create alert:', error.message);
    res.status(500).json({ error: 'Failed to create alert.' });
  }
};

// Get all alerts
export const getAlerts = async (_req: Request, res: Response) => {
  try {
    const alerts = await WeatherAlert.find();
    res.json(alerts);
  } catch (error: any) {
    console.error('❌ Failed to fetch alerts:', error.message);
    res.status(500).json({ error: 'Failed to fetch alerts.' });
  }
};
