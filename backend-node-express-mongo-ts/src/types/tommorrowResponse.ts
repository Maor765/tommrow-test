interface WeatherResponse {
  data: {
    time: string;
    values: {
      temperature: number;
      humidity: number;
      weatherCode: number;
      windSpeed: number;
      cloudCover: number;
      precipitationProbability: number;
      // Add more fields from Tomorrow.io if needed
    };
  };
  location: {
    lat: number;
    lon: number;
    name?: string;
  };
}
