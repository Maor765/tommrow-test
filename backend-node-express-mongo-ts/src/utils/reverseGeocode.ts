import axios from 'axios';

export const getCityFromCoordinates = async (
  lat: number,
  lon: number,
): Promise<string | null> => {
  try {
    const response = await axios.get<any>(
      'https://nominatim.openstreetmap.org/reverse',
      {
        params: {
          lat,
          lon,
          format: 'json',
        },
        headers: {
          'User-Agent': 'node-express-mongo-ts-app',
        },
      },
    );

    const address = response.data.address;
    // console.log('🌍 Reverse geocoding result:', address);

    // Prefer city, fallback to town, village, or state
    return (
      address.city || address.town || address.village || address.state || null
    );
  } catch (error: any) {
    console.error('❌ Reverse geocoding failed:', error.message);
    return null;
  }
};
