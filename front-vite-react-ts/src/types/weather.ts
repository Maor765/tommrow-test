export type Weather = {
  coordinates: {
    lat: number;
    lon: number;
  };
  city?: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  createdAt: Date;
};
