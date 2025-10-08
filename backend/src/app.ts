import express from 'express';
import { errorHandler } from './middleware/error.middleware';
import memberRoutes from './routes/member.routes';
import authRoutes from './routes/auth.routes';
import duesRoutes from './routes/dues.routes';
import eventRoutes from './routes/event.routes';
import transactionRoutes from './routes/transaction.routes';
import reportRoutes from './routes/report.routes';

const app = express();

app.use(express.json()); // Enable JSON body parser

app.use('/api/members', memberRoutes);
app.use('/auth', authRoutes);
app.use('/api/dues', duesRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

// Error handling middleware
app.use(errorHandler);

export default app;
