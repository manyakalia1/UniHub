import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import eventRoutes from './routes/eventRoutes.js';
import clubRoutes from './routes/clubRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for frontend JSON sharing
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
  console.log(`[API] ${req.method} ${req.url}`);
  next();
});

// Root API Health Status
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    portal: 'EventSync REST API Server',
    enterprise: 'RM Enterprises',
    timestamp: new Date().toISOString()
  });
});

// Mount Routes
app.use('/api/v1/events', eventRoutes);
app.use('/api/v1/clubs', clubRoutes);
app.use('/api/v1/notices', noticeRoutes);
app.use('/api/v1/auth', authRoutes);

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Endpoint Not Found' });
});

app.listen(PORT, () => {
  console.log(`🚀 EventSync Express REST API Server running at http://localhost:${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/v1/health`);
});
