export type WeatherAlert = {
  name?: string;
  description?: string;
  userId?: string;
  condition: {
    parameter: "temperature" | "windSpeed" | "precipitation";
    operator: ">" | "<" | ">=" | "<=" | "==";
    value: number;
  };
  location: {
    lat: number;
    lon: number;
    city?: string;
  };
  state: "triggered" | "not triggered";
  createdAt: Date;
  updatedAt: Date;
};
