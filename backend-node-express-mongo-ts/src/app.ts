import express from 'express';
import weatherRoutes from './routes/weather.routes';
import weatherAlertRoutes from './routes/weatherAlert.routes';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', weatherAlertRoutes);

export default app;
