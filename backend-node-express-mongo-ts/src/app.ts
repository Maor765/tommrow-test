import express from 'express';
import userRoutes from './routes/user.routes';
import weatherRoutes from './routes/weather.routes';
import weatherAlertRoutes from './routes/weatherAlert.routes';

const app = express();

// Middlewares
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/alerts', weatherAlertRoutes);

export default app;
