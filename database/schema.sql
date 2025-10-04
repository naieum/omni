-- Omni Database Schema
-- Initial schema for MVP (Music focus)

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  country TEXT,
  state TEXT,
  preferences TEXT, -- JSON
  accessibility_settings TEXT -- JSON
);

CREATE INDEX idx_users_email ON users(email);

-- Media table (all media types)
CREATE TABLE IF NOT EXISTS media (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'music', 'movie', 'tv', 'book', 'news', 'podcast'
  source TEXT NOT NULL, -- 'api' or 'user_upload'
  api_source TEXT, -- 'musicbrainz', 'tmdb', 'openlibrary', etc.
  api_id TEXT, -- ID from the external API
  metadata TEXT NOT NULL, -- JSON with all metadata
  status TEXT DEFAULT 'active', -- 'active', 'moderation', 'removed'
  uploaded_by TEXT, -- user_id if user upload
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES users(id)
);

CREATE INDEX idx_media_type ON media(type);
CREATE INDEX idx_media_source ON media(source);
CREATE INDEX idx_media_api_source_id ON media(api_source, api_id);

-- User Library (owned content)
CREATE TABLE IF NOT EXISTS user_library (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  media_id TEXT NOT NULL,
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  progress TEXT, -- JSON: {timestamp_ms: 125000, page: 42, etc}
  completed INTEGER DEFAULT 0, -- 0 or 1 (boolean)
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
  UNIQUE(user_id, media_id)
);

CREATE INDEX idx_user_library_user ON user_library(user_id);
CREATE INDEX idx_user_library_media ON user_library(media_id);

-- Media Comments (timestamp/location-based)
CREATE TABLE IF NOT EXISTS media_comments (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  text TEXT NOT NULL,
  location_type TEXT NOT NULL, -- 'timestamp', 'page', 'paragraph', 'selection'
  location_data TEXT NOT NULL, -- JSON: {timestamp_ms: 125000} or {page: 42, chapter: 3}
  parent_comment_id TEXT, -- for threaded replies
  likes_count INTEGER DEFAULT 0,
  reports_count INTEGER DEFAULT 0,
  moderation_status TEXT DEFAULT 'active', -- 'active', 'flagged', 'removed'
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_comment_id) REFERENCES media_comments(id) ON DELETE CASCADE
);

CREATE INDEX idx_comments_media ON media_comments(media_id);
CREATE INDEX idx_comments_user ON media_comments(user_id);
CREATE INDEX idx_comments_parent ON media_comments(parent_comment_id);

-- Artists table (for independent uploads)
CREATE TABLE IF NOT EXISTS artists (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  display_name TEXT NOT NULL,
  bio TEXT,
  verified INTEGER DEFAULT 0,
  social_links TEXT, -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id)
);

CREATE INDEX idx_artists_user ON artists(user_id);

-- Media Files (storage references)
CREATE TABLE IF NOT EXISTS media_files (
  id TEXT PRIMARY KEY,
  media_id TEXT NOT NULL,
  file_type TEXT NOT NULL, -- 'video', 'audio', 'image', 'document'
  r2_path TEXT NOT NULL,
  stream_id TEXT, -- Cloudflare Stream ID if video
  size INTEGER,
  format TEXT,
  processing_status TEXT DEFAULT 'pending', -- 'pending', 'processing', 'complete', 'error'
  webhook_data TEXT, -- JSON
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE
);

CREATE INDEX idx_files_media ON media_files(media_id);
CREATE INDEX idx_files_status ON media_files(processing_status);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  media_id TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  text TEXT,
  helpful_count INTEGER DEFAULT 0,
  not_helpful_count INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
  UNIQUE(user_id, media_id)
);

CREATE INDEX idx_reviews_media ON reviews(media_id);
CREATE INDEX idx_reviews_user ON reviews(user_id);
