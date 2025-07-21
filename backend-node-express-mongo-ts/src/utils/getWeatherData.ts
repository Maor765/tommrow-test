import axios from 'axios';

const BASE_URL = 'https://api.tomorrow.io/v4/weather/realtime';

export const getWeatherData = async (
  lat: number,
  lon: number,
): Promise<WeatherResponse> => {
  const API_KEY = process.env.WEATHER_API_KEY;

  try {
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        location: `${lat},${lon}`,
        apikey: API_KEY,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error(
      '❌ Error fetching weather data:',
      error.response?.data || error.message,
    );
    throw new Error('Failed to fetch weather data.');
  }
};
