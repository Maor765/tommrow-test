import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { startAlertChecker } from './services/alertChecker.service';
import cors from 'cors';

dotenv.config();

// Allow all origins (dev only)
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || '';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

// Start background job after DB connects
mongoose.connection.once('open', () => {
  console.log('✅ Listeners started for weather alerts');
  startAlertChecker();
});

