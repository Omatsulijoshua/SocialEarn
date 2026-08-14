import express, { Request, Response } from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

import { authRouter } from './routes/auth';
import { tasksRouter } from './routes/tasks';
import { campaignsRouter } from './routes/campaigns';
import { walletRouter } from './routes/wallet';
import { watchRouter } from './routes/watch';
import { adminRouter } from './routes/admin';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
  }
});

app.use(cors());
app.use(express.json());

// API Routers
app.use('/api/auth', authRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/campaigns', campaignsRouter);
app.use('/api/wallet', walletRouter);
app.use('/api/watch', watchRouter);
app.use('/api/admin', adminRouter);

// Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'SocialEarn Backend API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Socket.IO Realtime Connection Engine (Phases 7, 30)
io.on('connection', (socket) => {
  socket.on('join_campaign', (campaignId: string) => {
    socket.join(`campaign_${campaignId}`);
  });

  socket.on('disconnect', () => {
    // Clean disconnection
  });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
  server.listen(PORT, () => {
    console.log(`🚀 SocialEarn API & WebSockets server running on http://localhost:${PORT}`);
  });
}

export { app, server, io };
