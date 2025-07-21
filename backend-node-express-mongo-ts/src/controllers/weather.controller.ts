import { Request, Response } from 'express';
import Weather from '../models/weather.model';
import { getCityFromCoordinates } from '../utils/reverseGeocode';
import { getWeatherData } from '../utils/getWeatherData';

export const getWeather = async (req: Request, res: Response) => {
  console.log(`🌍-----`);
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    return res
      .status(400)
      .json({ error: 'Latitude and longitude are required.' });
  }

  try {
    const data = await getWeatherData(Number(lat), Number(lon));
    const city = await getCityFromCoordinates(Number(lat), Number(lon));
    if (city) {
      console.log(`🌍 Location: ${city}`);
    } else {
      console.log('🌍 Location: Not found');
    }

    const insertWeather = {
      coordinates: { lat, lon },
      temperature: data.data.values.temperature,
      windSpeed: data.data.values.windSpeed,
      precipitation: data.data.values.precipitationProbability,
      city: city || 'N/A',
    };
    const weather = new Weather(insertWeather);

    res.json({
      ...insertWeather,
      raw: data.data,
      createdAt: new Date(),
    });

    await weather.save();
  } catch (error: any) {
    console.error(
      '❌ Error fetching weather data:',
      error.response?.data || error.message,
    );
    res.status(500).json({ error: 'Failed to fetch weather data.' });
  }
};
