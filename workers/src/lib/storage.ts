/**
 * Storage utilities for caching images and media to R2
 */

/**
 * Cache an image from a URL to R2 bucket
 * Returns the R2 object key if successful
 */
export async function cacheImageToR2(
  bucket: R2Bucket,
  imageUrl: string,
  key: string
): Promise<string | null> {
  try {
    // Check if already cached
    const existing = await bucket.head(key);
    if (existing) {
      return key;
    }

    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      console.error(`Failed to fetch image from ${imageUrl}: ${response.status}`);
      return null;
    }

    // Get content type
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // Upload to R2
    await bucket.put(key, response.body, {
      httpMetadata: {
        contentType,
      },
    });

    return key;
  } catch (error) {
    console.error('Error caching image to R2:', error);
    return null;
  }
}

/**
 * Get a cached image from R2 or cache it if not present
 * Returns a Response object with the image
 */
export async function getCachedImage(
  bucket: R2Bucket,
  imageUrl: string,
  key: string
): Promise<Response> {
  try {
    // Try to get from R2 first
    const cached = await bucket.get(key);

    if (cached) {
      return new Response(cached.body, {
        headers: {
          'Content-Type': cached.httpMetadata?.contentType || 'image/jpeg',
          'Cache-Control': 'public, max-age=31536000', // 1 year
          'X-Cache': 'HIT',
        },
      });
    }

    // Not cached, fetch and cache it
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return new Response('Image not found', { status: 404 });
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg';
    const imageData = await response.arrayBuffer();

    // Cache to R2 (fire and forget)
    bucket.put(key, imageData, {
      httpMetadata: {
        contentType,
      },
    });

    return new Response(imageData, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error getting cached image:', error);
    return new Response('Internal server error', { status: 500 });
  }
}

/**
 * Generate a consistent R2 key for album art
 */
export function getAlbumArtKey(releaseId: string, size: 'small' | 'large' = 'large'): string {
  return `music/albums/${releaseId}/cover-${size}.jpg`;
}
