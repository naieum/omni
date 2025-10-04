import { Hono } from 'hono';
import { cors } from 'hono/cors';

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

// Music routes (coming soon)
app.get('/api/music/search', (c) => {
  return c.json({ message: 'Music search coming soon' });
});

export default app;
