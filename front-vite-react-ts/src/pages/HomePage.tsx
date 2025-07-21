import { InputNumber } from "primereact/inputnumber";
import WeatherCard from "../components/WeatherCard";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { fetchWeather } from "../services/weatherService";
import { type Weather } from "../types/weather";

type FormValues = {
  lat: number;
  lon: number;
};

export default function HomePage() {
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<Weather | undefined>(undefined);

  useEffect(() => {
    fetchWeather(32.0853, 34.7818)
      .then((data) => setWeather(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const onSubmit = async (data: FormValues) => {
    console.log("Form Data:", data);
    fetchWeather(data.lat, data.lon)
      .then((data) => setWeather(data))
      .catch((err) => {
        console.error("Error fetching weather:", err);
        alert("Failed to fetch weather. Check console for details.");
      })
      .finally(() => setLoading(false));

    try {
      setLoading(true);
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold p-6">Home Page</h1>

      <h2 className="text-2xl font-bold p-6">Enter coordinates</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-3 gap-4"
      >
        <div>
          <label className="block mb-1 font-medium">Latitude</label>
          <InputNumber
            value={watch("lat")}
            onValueChange={(e) => setValue("lat", Number(e.value))}
            placeholder="Enter latitude (-90 to 90)"
            min={-90}
            max={90}
            className={errors.lat ? "p-invalid" : ""}
            useGrouping={false}
          />
          {errors.lat && (
            <p className="text-red-500 text-sm">{errors.lat.message}</p>
          )}
        </div>

        <div>
          <label className="block mb-1 font-medium">Longitude</label>
          <InputNumber
            value={watch("lon")}
            onValueChange={(e) => setValue("lon", Number(e.value))}
            placeholder="Enter longitude (-180 to 180)"
            min={-180}
            max={180}
            className={errors.lon ? "p-invalid" : ""}
          />
          {errors.lon && (
            <p className="text-red-500 text-sm">{errors.lon.message}</p>
          )}
        </div>

        <Button
          type="submit"
          label="Get Weather"
          icon="pi pi-search"
          loading={loading}
        />
      </form>
      <WeatherCard weather={weather} loading={loading} />
    </div>
  );
}
