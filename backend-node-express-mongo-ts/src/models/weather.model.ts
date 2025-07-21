import mongoose, { Document, Schema } from 'mongoose';

export interface IWeather extends Document {
  coordinates: {
    lat: number;
    lon: number;
  };
  city?: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  createdAt: Date;
  updatedAt: Date;
}

const WeatherSchema: Schema = new Schema(
  {
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
    },
    city: { type: String },
    temperature: { type: Number, required: true },
    windSpeed: { type: Number, required: true },
    precipitation: { type: Number, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IWeather>('Weather', WeatherSchema);
