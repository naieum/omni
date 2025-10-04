import { Hono } from 'hono';
import { cors } from 'hono/cors';
import music from './routes/music';

type Bindings = {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  CACHE: KVNamespace;
};

const app = new Hono<{ Bindings: Bindings }>();

// CORS middleware
app.use('/*', cors());

// Health check
app.get('/', (c) => {
  return c.json({
    status: 'ok',
    message: 'Omni API - The last stop for all media',
    version: '0.1.0',
  });
});

// API routes
app.get('/api/health', (c) => {
  return c.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Music routes
app.route('/api/music', music);

export default app;
