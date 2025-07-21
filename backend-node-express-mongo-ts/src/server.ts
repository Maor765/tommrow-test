import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import { startAlertChecker } from './services/alertChecker.service';
import cors from 'cors';

dotenv.config();

// Allow all origins (dev only)
app.use(cors());
// app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

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

// // Add headers
// app.use(function (req, res, next) {
//   // Website you wish to allow to connect
//   res.setHeader('Access-Control-Allow-Origin', '*');

//   // Request methods you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Methods',
//     'GET, POST, OPTIONS, PUT, PATCH, DELETE',
//   );

//   // Request headers you wish to allow
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-Requested-With,content-type',
//   );

//   // Set to true if you need the website to include cookies in the requests sent
//   // to the API (e.g. in case you use sessions)
//   res.setHeader('Access-Control-Allow-Credentials', 'true');

//   // Pass to next layer of middleware
//   next();
// });
