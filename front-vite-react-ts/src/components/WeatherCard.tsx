import { Card } from "primereact/card";
import { ProgressSpinner } from "primereact/progressspinner";
import type { Weather } from "../types/weather";

type Props = {
  weather?: Weather;
  loading: boolean;
};
export default function WeatherCard({ weather, loading }: Props) {
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <ProgressSpinner />
      </div>
    );

  if (!weather)
    return (
      <div className="text-center text-red-500">
        Failed to load weather data.
      </div>
    );

  return (
    <div className="p-6">
      <Card
        title={`Weather in ${weather?.city}`}
        subTitle={new Date(weather.createdAt).toLocaleString()}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>🌡️ Temperature: {weather.temperature}°C</div>
          <div>💨 Wind Speed: {weather.windSpeed} km/h</div>
          <div>🌧️ Precipitation: {weather.precipitation} mm/h</div>
        </div>
      </Card>
    </div>
  );
}
