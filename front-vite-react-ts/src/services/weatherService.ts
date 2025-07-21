import type { Weather } from "../types/weather";

export const fetchWeather = async (
  lat: number,
  lon: number
): Promise<Weather> => {
  const response = await fetch(`/api/weather/realtime?lat=${lat}&lon=${lon}`);
  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
};
