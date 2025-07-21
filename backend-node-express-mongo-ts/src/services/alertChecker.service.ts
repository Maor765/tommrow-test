import cron from 'node-cron';
import WeatherAlert from '../models/weatherAlert.model';
import Weather, { IWeather } from '../models/weather.model';
import { getWeatherData } from '../utils/getWeatherData';

export const startAlertChecker = () => {
  // Run every 5 minutes (adjust as needed)
  // in test 5 seconds : '*/5 * * * * *'
  cron.schedule('*/5 * * * *', async () => {
    console.log('🔔 Checking weather alerts...');

    try {
      const alerts = await WeatherAlert.find();
      const weathers = await Weather.find({ sort: { createdAt: -1 } });
      for (const alert of alerts) {
        const { lat, lon } = alert.location;
        const { parameter, operator, value } = alert.condition;

        const weatherData = await getLatestWeatherData(weathers, lat, lon);
        if (!weatherData) {
          console.error(
            `❌ No weather data found for location: ${lat}, ${lon}`,
          );
          continue;
        }
        const currentValue = weatherData[parameter];
        console.log(
          `📍 ${alert.location.city || lat + ',' + lon} | ${parameter}: ${currentValue}`,
        );

        const isTriggered = evaluateCondition(currentValue, operator, value);
        // Save updated state if changed
        const newState = isTriggered ? 'triggered' : 'not triggered';

        if (alert.state !== newState) {
          alert.state = newState;
          await alert.save();
          console.log(
            `⚡ Alert state updated: ${alert.name || alert._id} => ${newState}`,
          );
        }
      }
    } catch (error: any) {
      console.error('❌ Error during alert check:', error.message);
    }
  });
};

const getLatestWeatherData = async (
  weathers: IWeather[],
  lat: number,
  lon: number,
) => {
  const weatherData = weathers.find(
    (w) => w.coordinates.lat === lat && w.coordinates.lon === lon,
  );
  return weatherData;
  // if (weatherData) {
  //   return weatherData;
  // }
  // // If no weather data found, fetch it from the API
  // try {
  //   const data = await getWeatherData(lat, lon);
  //   return {
  //     coordinates: { lat, lon },
  //     temperature: data.data.values.temperature,
  //     windSpeed: data.data.values.windSpeed,
  //     precipitation: data.data.values.precipitationProbability,
  //   };
  // } catch (error: any) {
  //   console.error(
  //     '❌ Error fetching latest weather data:',
  //     error.response?.data || error.message,
  //   );
  //   return null;
  // }
};

const evaluateCondition = (
  currentValue: number,
  operator: string,
  threshold: number,
): boolean => {
  switch (operator) {
    case '>':
      return currentValue > threshold;
    case '<':
      return currentValue < threshold;
    case '>=':
      return currentValue >= threshold;
    case '<=':
      return currentValue <= threshold;
    case '==':
      return currentValue === threshold;
    default:
      return false;
  }
};
