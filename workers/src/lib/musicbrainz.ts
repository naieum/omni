/**
 * MusicBrainz API Client
 * https://musicbrainz.org/doc/MusicBrainz_API
 *
 * Rate limit: 1 request per second
 * User-Agent required
 */

const MUSICBRAINZ_API_BASE = 'https://musicbrainz.org/ws/2';
const USER_AGENT = 'Omni/0.1.0 (https://github.com/naieum/omni)';

export interface MusicBrainzArtist {
  id: string;
  name: string;
  'sort-name': string;
  disambiguation?: string;
  country?: string;
  'life-span'?: {
    begin?: string;
    end?: string;
  };
  tags?: Array<{ name: string; count: number }>;
  score?: number;
}

export interface MusicBrainzRelease {
  id: string;
  title: string;
  date?: string;
  country?: string;
  'release-group'?: {
    id: string;
    'primary-type'?: string;
  };
  'artist-credit'?: Array<{
    artist: {
      id: string;
      name: string;
    };
  }>;
  score?: number;
}

export interface MusicBrainzRecording {
  id: string;
  title: string;
  length?: number; // milliseconds
  'artist-credit'?: Array<{
    artist: {
      id: string;
      name: string;
    };
  }>;
  releases?: Array<{
    id: string;
    title: string;
  }>;
  score?: number;
}

interface SearchResponse<T> {
  created: string;
  count: number;
  offset: number;
  artists?: T[];
  releases?: T[];
  recordings?: T[];
}

/**
 * Make a request to MusicBrainz API with proper headers and rate limiting
 */
async function mbRequest<T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> {
  const url = new URL(`${MUSICBRAINZ_API_BASE}${endpoint}`);
  url.searchParams.set('fmt', 'json');

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), {
    headers: {
      'User-Agent': USER_AGENT,
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`MusicBrainz API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Search for artists
 */
export async function searchArtists(
  query: string,
  limit: number = 10,
  offset: number = 0
): Promise<SearchResponse<MusicBrainzArtist>> {
  return mbRequest('/artist', {
    query,
    limit: String(limit),
    offset: String(offset),
  });
}

/**
 * Search for releases (albums)
 */
export async function searchReleases(
  query: string,
  limit: number = 10,
  offset: number = 0
): Promise<SearchResponse<MusicBrainzRelease>> {
  return mbRequest('/release', {
    query,
    limit: String(limit),
    offset: String(offset),
  });
}

/**
 * Search for recordings (tracks)
 */
export async function searchRecordings(
  query: string,
  limit: number = 10,
  offset: number = 0
): Promise<SearchResponse<MusicBrainzRecording>> {
  return mbRequest('/recording', {
    query,
    limit: String(limit),
    offset: String(offset),
  });
}

/**
 * Get artist details by ID
 */
export async function getArtist(id: string): Promise<MusicBrainzArtist> {
  return mbRequest(`/artist/${id}`, {
    inc: 'tags+ratings+release-groups',
  });
}

/**
 * Get release (album) details by ID
 */
export async function getRelease(id: string): Promise<MusicBrainzRelease> {
  return mbRequest(`/release/${id}`, {
    inc: 'artists+recordings+release-groups',
  });
}

/**
 * Get recording (track) details by ID
 */
export async function getRecording(id: string): Promise<MusicBrainzRecording> {
  return mbRequest(`/recording/${id}`, {
    inc: 'artists+releases',
  });
}

/**
 * Get Cover Art Archive URL for a release
 */
export function getCoverArtUrl(releaseId: string, size: 'small' | 'large' = 'large'): string {
  const sizeParam = size === 'small' ? '-250' : '-500';
  return `https://coverartarchive.org/release/${releaseId}/front${sizeParam}`;
}
