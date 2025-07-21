import type { WeatherAlertFormValues } from "../pages/AlertsPage";
import type { WeatherAlert } from "../types/weatherAlert";

export const createWeatherAlert = async (
  body: WeatherAlertFormValues
): Promise<WeatherAlert | null> => {
  try {
    const response = await fetch(`/api/alerts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Response:", data);
    return data as WeatherAlert;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
};

export const getWeatherAlerts = async (): Promise<WeatherAlert[]> => {
  const response = await fetch(`/api/alerts`);
  if (!response.ok) throw new Error("Failed to fetch weather");
  return response.json();
};
