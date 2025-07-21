import mongoose, { Document, Schema } from 'mongoose';

export interface IWeatherAlert extends Document {
  name?: string;
  description?: string;
  userId?: string;
  condition: {
    parameter: 'temperature' | 'windSpeed' | 'precipitation';
    operator: '>' | '<' | '>=' | '<=' | '==';
    value: number;
  };
  location: {
    lat: number;
    lon: number;
    city?: string;
  };
  state: 'triggered' | 'not triggered';
  createdAt: Date;
  updatedAt: Date;
}

const WeatherAlertSchema: Schema = new Schema(
  {
    name: { type: String },
    description: { type: String },
    userId: { type: String },
    condition: {
      parameter: {
        type: String,
        enum: ['temperature', 'windSpeed', 'precipitation'],
        required: true,
      },
      operator: {
        type: String,
        enum: ['>', '<', '>=', '<=', '=='],
        required: true,
      },
      value: { type: Number, required: true },
    },
    location: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true },
      city: { type: String },
    },
    state: {
      type: String,
      enum: ['triggered', 'not triggered'],
      default: 'not triggered',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IWeatherAlert>(
  'WeatherAlert',
  WeatherAlertSchema,
);
