import { Hono } from 'hono';
import {
  searchArtists,
  searchReleases,
  searchRecordings,
  getArtist,
  getRelease,
  getRecording,
  getCoverArtUrl,
} from '../lib/musicbrainz';
import { getCachedImage, getAlbumArtKey } from '../lib/storage';

type Bindings = {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  CACHE: KVNamespace;
};

const music = new Hono<{ Bindings: Bindings }>();

/**
 * Search music (artists, albums, tracks)
 * GET /music/search?q=query&type=artist|release|recording&limit=10&offset=0
 */
music.get('/search', async (c) => {
  const query = c.req.query('q');
  const type = c.req.query('type') || 'artist';
  const limit = parseInt(c.req.query('limit') || '10', 10);
  const offset = parseInt(c.req.query('offset') || '0', 10);

  if (!query) {
    return c.json({ error: 'Query parameter "q" is required' }, 400);
  }

  // Check cache first
  const cacheKey = `music:search:${type}:${query}:${limit}:${offset}`;
  const cached = await c.env.CACHE.get(cacheKey);

  if (cached) {
    return c.json({ ...JSON.parse(cached), cached: true });
  }

  try {
    let result;

    switch (type) {
      case 'artist':
        result = await searchArtists(query, limit, offset);
        break;
      case 'release':
      case 'album':
        result = await searchReleases(query, limit, offset);
        break;
      case 'recording':
      case 'track':
        result = await searchRecordings(query, limit, offset);
        break;
      default:
        return c.json({ error: 'Invalid type. Use: artist, release, or recording' }, 400);
    }

    // Cache for 15 minutes
    await c.env.CACHE.put(cacheKey, JSON.stringify(result), {
      expirationTtl: 900,
    });

    // Rate limiting: Wait 1 second between requests (simple implementation)
    // In production, use more sophisticated rate limiting with KV
    return c.json({ ...result, cached: false });
  } catch (error) {
    console.error('MusicBrainz search error:', error);
    return c.json(
      { error: 'Failed to search music', details: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});

/**
 * Get artist details
 * GET /music/artist/:id
 */
music.get('/artist/:id', async (c) => {
  const id = c.req.param('id');

  // Check cache
  const cacheKey = `music:artist:${id}`;
  const cached = await c.env.CACHE.get(cacheKey);

  if (cached) {
    return c.json({ ...JSON.parse(cached), cached: true });
  }

  try {
    const artist = await getArtist(id);

    // Cache for 1 hour (artist data doesn't change often)
    await c.env.CACHE.put(cacheKey, JSON.stringify(artist), {
      expirationTtl: 3600,
    });

    return c.json({ ...artist, cached: false });
  } catch (error) {
    console.error('MusicBrainz artist error:', error);
    return c.json(
      { error: 'Failed to get artist', details: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});

/**
 * Get release (album) details
 * GET /music/release/:id or /music/album/:id
 */
music.get('/release/:id', async (c) => {
  const id = c.req.param('id');

  // Check cache
  const cacheKey = `music:release:${id}`;
  const cached = await c.env.CACHE.get(cacheKey);

  if (cached) {
    return c.json({ ...JSON.parse(cached), cached: true });
  }

  try {
    const release = await getRelease(id);

    // Add cover art URL
    const coverArtUrl = getCoverArtUrl(id);

    // Cache for 1 hour
    await c.env.CACHE.put(cacheKey, JSON.stringify({ ...release, coverArtUrl }), {
      expirationTtl: 3600,
    });

    return c.json({ ...release, coverArtUrl, cached: false });
  } catch (error) {
    console.error('MusicBrainz release error:', error);
    return c.json(
      { error: 'Failed to get release', details: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});

// Alias for /release
music.get('/album/:id', async (c) => {
  const id = c.req.param('id');
  c.req.param = () => id; // Forward to release endpoint
  return c.redirect(`/api/music/release/${id}`);
});

/**
 * Get recording (track) details
 * GET /music/recording/:id or /music/track/:id
 */
music.get('/recording/:id', async (c) => {
  const id = c.req.param('id');

  // Check cache
  const cacheKey = `music:recording:${id}`;
  const cached = await c.env.CACHE.get(cacheKey);

  if (cached) {
    return c.json({ ...JSON.parse(cached), cached: true });
  }

  try {
    const recording = await getRecording(id);

    // Cache for 1 hour
    await c.env.CACHE.put(cacheKey, JSON.stringify(recording), {
      expirationTtl: 3600,
    });

    return c.json({ ...recording, cached: false });
  } catch (error) {
    console.error('MusicBrainz recording error:', error);
    return c.json(
      { error: 'Failed to get recording', details: error instanceof Error ? error.message : 'Unknown error' },
      500
    );
  }
});

// Alias for /recording
music.get('/track/:id', async (c) => {
  const id = c.req.param('id');
  return c.redirect(`/api/music/recording/${id}`);
});

/**
 * Get album art (cached from Cover Art Archive to R2)
 * GET /music/cover/:releaseId?size=large|small
 */
music.get('/cover/:releaseId', async (c) => {
  const releaseId = c.req.param('releaseId');
  const size = (c.req.query('size') as 'small' | 'large') || 'large';

  // Get cover art URL from Cover Art Archive
  const coverArtUrl = getCoverArtUrl(releaseId, size);

  // Get R2 key
  const r2Key = getAlbumArtKey(releaseId, size);

  // Get cached image (or cache it if not present)
  return getCachedImage(c.env.MEDIA_BUCKET, coverArtUrl, r2Key);
});

export default music;
