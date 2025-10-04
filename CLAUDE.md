# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Omni is the last stop for all media. A platform where users truly own their content library—where nothing can ever be taken away. We provide on-demand access to TV shows, movies, books, magazines, newspapers, and music, while empowering independent artists to share their work directly with audiences.

### Core Philosophy

**User Ownership First**
- Users own their media library completely
- No corporate gatekeeping or content removal
- Once in your library, it's yours forever
- Platform for the people, not corporations

**Open & Transparent**
- All code open source (except security-critical protections)
- No patents, no closed source to hide from users
- Security measures only to protect users, never to restrict them
- Community-driven development

**Universal Access**
- Available to everyone, everywhere, always
- Country and state compliant while maintaining availability
- Accessibility is mandatory, not optional
- Simple, intuitive UX for all users

**Artist Empowerment**
- Direct upload platform for independent creators
- Musicians, filmmakers, writers, podcasters welcome
- 100% royalties to artists
- No corporate middlemen

## Technology Stack

### Frontend (React)

**Core Framework**
- React 18+ with modern hooks and concurrent features
- React Router for navigation
- State management: Context API + React Query for server state
- Deployed via Cloudflare Pages

**Video Players**
- Primary: Vidstack (modern, accessible, performant)
- Fallback: react-player (wide format support)
- HLS.js for adaptive streaming
- Integration with Cloudflare Stream

**UI/UX Requirements**
- Minimal, content-first design
- Media is the star—UI fades to background
- ADA compliant (WCAG 2.1 AA minimum)
- Color blind friendly (use icons + text, not color alone)
- Full keyboard navigation
- Screen reader optimized
- Responsive: mobile, tablet, desktop, TV browsers

**Key Features**
- Infinite scroll for media browsing
- Advanced search with filters
- Personal library management (owned content)
- **Timestamp/Location Comments** (like SoundCloud, but for ALL media):
  - Music: comment on specific timestamps in tracks
  - Video: comment on specific moments/scenes
  - Books: comment on pages, chapters, or text selections
  - Podcasts: timestamp-based episode discussions
  - News articles: paragraph-level commentary
  - User opt-in (can hide/show comments)
  - Real-time sync during playback
- Social features (reviews, ratings, lists, follows)
- Links to external discussions (podcasts about episodes, reviews, etc.)
- User-configurable parental controls
- Multi-language support
- Dark/light themes with high contrast options

### Backend & Infrastructure (Cloudflare)

**Cloudflare Workers**
- API endpoints for all operations
- Authentication & authorization
- Rate limiting and abuse prevention
- Webhook processing for media ingestion
- Integration with third-party APIs

**Cloudflare D1 (SQLite)**
- User accounts and profiles
- Media metadata (normalized from APIs + user uploads)
- User libraries and preferences
- Artist profiles and upload metadata
- Country/state compliance settings
- Social features (reviews, ratings, lists)

**Cloudflare R2 (Object Storage)**
- Third-party media assets (posters, covers, images)
- User-uploaded media files from independent artists
- Processed video/audio files
- User avatars and profile media
- Zero egress fees critical for sustainability

**Cloudflare Workers KV**
- Session management
- API rate limit tracking
- Popular content caching
- Feature flags
- Real-time user preferences

**Cloudflare Stream**
- Video encoding and delivery
- Adaptive bitrate streaming
- Webhook notifications for processing status
- Integration with Media Transformations

**Cloudflare Images**
- Dynamic image resizing/optimization
- Format conversion (WebP, AVIF)
- Webhook notifications for upload status

**Cloudflare Workflows** (2025 GA)
- Durable execution for long-running processes
- Media processing pipelines
- Multi-step artist upload workflows
- Retry logic for external API calls

### Thin Clients - Platform-Specific Strategy

#### Web (React - Primary Platform)
- See Frontend section above
- Progressive Web App (PWA) for offline access
- Service workers for caching
- Target: All modern browsers

#### iOS & iPadOS (Swift/SwiftUI)
- Native Swift app using SwiftUI
- AVPlayer for video/audio playback
- Integration with iOS media controls
- SharePlay support for social viewing
- Widgets for home screen
- Handoff between devices
- Universal app (iPhone + iPad optimized)
- Target: iOS 17+, iPadOS 17+

#### Android Mobile & Tablet (Kotlin)
- Native Kotlin app with Jetpack Compose
- ExoPlayer for media playback
- Material You design system
- Picture-in-picture support
- Widget support
- Chromecast integration
- Target: Android 12+ (API 31+)

#### Roku (BrightScript + SceneGraph)
**Why Roku**: Largest TV platform, robust development ecosystem
- BrightScript language + SceneGraph XML UI framework
- Custom UI (no Direct Publisher - deprecated 2024)
- Remote-first navigation (4-directional + select)
- Focus management critical for UX
- Test across Roku device models (performance varies)
- Deep linking support for content discovery
- Target: Roku OS 12+

#### Apple TV (tvOS/Swift)
- Swift + UIKit/SwiftUI
- Focus engine for remote navigation
- HLS for streaming (native support)
- FairPlay DRM if needed
- Siri integration for voice search
- New Liquid Glass design (tvOS 26)
- Apple Account integration for sign-in (new API)
- Target: tvOS 18+

#### Fire TV (Android TV variant)
- Android TV app (Kotlin + Jetpack)
- Amazon-specific requirements
- Fire TV remote navigation
- Alexa voice integration
- In-app purchasing via Amazon
- Target: Fire OS 7+

#### Android TV & Google TV (Kotlin)
- Leanback library for TV UI
- ExoPlayer for playback
- Google Cast integration
- Voice search via Google Assistant
- Live channels integration
- Target: Android TV 12+

#### Samsung Tizen (Web - Lightning.js option)
- Web-based app (HTML5/JS/CSS)
- Tizen APIs for TV features
- Optional: Lightning.js for WebGL rendering
- Samsung remote control APIs
- Tizen-specific security requirements
- Target: Tizen 6.0+

#### LG webOS (Web - Lightning.js option)
- Web-based app (HTML5/JS/CSS)
- webOS APIs for TV integration
- Optional: Lightning.js for performance
- Magic Remote support
- webOS app certification required
- Target: webOS 6.0+

**Cross-Platform Strategy**
- Shared API contracts (OpenAPI spec)
- Consistent data models across all clients
- Feature parity where platform allows
- Platform-specific optimizations (e.g., remote controls vs touch)
- Centralized analytics for all platforms

## AI, MCP & Language Model Integration

### MCP (Model Context Protocol) Integration

**What**: Open standard for connecting AI assistants to data sources (Anthropic, adopted by OpenAI, Google, Microsoft in 2025)

**Applications in Omni**:

1. **Personal Media Assistant**
   - Natural language queries: "Find sci-fi movies from the 90s I haven't watched"
   - Conversational recommendations
   - MCP connects LLM to user's library + metadata database

2. **Content Discovery**
   - "What should I watch based on my mood?"
   - Cross-media recommendations (book → movie → podcast)
   - MCP provides context from viewing history

3. **Artist Tools**
   - "Upload my album to Omni and create descriptions for each track"
   - Automated metadata generation with artist approval
   - MCP connects to upload pipeline

**Implementation**:
- MCP server running in Cloudflare Workers
- Connects Claude/GPT to D1 database
- Tools for search, recommendations, library management
- User privacy controls on AI data access

**Security Considerations** (MCP issues identified in 2025):
- Authentication required (avoid public MCP servers)
- Tool permissions carefully scoped
- Prompt injection prevention
- User consent for AI features

### Language Models for Content Operations

#### 1. Personalized Recommendations
**Use**: Analyze user's library + viewing patterns → suggest new content
**Models**: Claude, GPT-4, Gemini
**Implementation**:
- Vector embeddings for media similarity
- Collaborative filtering enhanced by LLM reasoning
- Explain recommendations ("Because you enjoyed...")
- Cross-media suggestions (movie fans → related books/soundtracks)

#### 2. Content Moderation (User Uploads)
**Use**: Review independent artist uploads for policy violations
**Models**: GPT-4 Vision, Claude 3.5 Sonnet
**Human-in-the-loop**: Always
**Challenges**:
- Multilingual content (identified 2025 weakness)
- Context understanding (avoid over-moderation)
- Bias in non-English content
**Best Practice**: AI flags → human reviews → transparent appeals process

#### 3. Metadata Enhancement
**Use**: Enrich sparse metadata from APIs or user uploads
**Examples**:
- Generate descriptions from plot summaries
- Extract themes and moods from content
- Tag accessibility features (subtitles, audio descriptions)
- Multi-language translations

#### 4. Smart Search
**Use**: Natural language search across all media types
**Examples**:
- "Movies like Inception but less confusing"
- "Upbeat instrumental music for working"
- "Books about space exploration written by women"
**Implementation**: Semantic search via embeddings + LLM query understanding

#### 5. Accessibility Features
**Use**: Auto-generate accessibility metadata
**Examples**:
- Image descriptions for visually impaired users
- Content warnings (photosensitivity, violence, etc.)
- Reading level estimates for books
- Transcript generation for videos

#### 6. Artist Support Tools
**Use**: Help independent creators optimize their content
**Examples**:
- Genre classification suggestions
- Metadata completeness checks
- Description writing assistance
- SEO optimization for discoverability

### AI Infrastructure
- Claude 3.5 Sonnet via Anthropic API (primary)
- OpenAI GPT-4/GPT-5 (secondary)
- Google Gemini (fallback)
- Local models for privacy-sensitive operations (Ollama on edge?)
- Vector database: Cloudflare Vectorize (when available) or Pinecone
- Cost controls: rate limiting, caching, batch processing

## Third-Party Media APIs

### Movies & TV Shows

**TMDb (The Movie Database)** - Primary
- Free for non-commercial use (requires attribution)
- Comprehensive metadata, high-quality images
- Cast/crew, trending, multilingual
- Rate limit: Respect fair use
- API: https://developer.themoviedb.org/

**OMDb (Open Movie Database)** - Supplementary
- 1,000 calls/day free tier
- Detailed plot/director/actor info
- Fill TMDb gaps

### Books

**Open Library** - Primary
- Free, 30M+ titles
- Cover images (S/M/L)
- Multiple identifiers: ISBN, OLID, LCCN, OCLC
- API: https://openlibrary.org/dev/docs/api

**Google Books** - Supplementary
- Largest digital library
- Full-text search, ratings, reviews
- Requires API key

### Music

**MusicBrainz** - Primary
- Free, open (2.6M artists, 35M recordings)
- Rate limit: 1 call/second (strict)
- Comprehensive metadata
- API: https://musicbrainz.org/doc/MusicBrainz_API

**Cover Art Archive** - Album covers
- 6M+ images, free
- Linked to MusicBrainz releases
- Multiple resolutions
- API: https://musicbrainz.org/doc/Cover_Art_Archive/API

**Spotify Web API** - Supplementary
- Rich metadata, requires attribution
- Discovery, playlists, popularity data
- Rate limits apply

### News & Magazines

**News API** - Primary
- 150K+ sources, 14 languages
- Free tier available
- Historical + current articles
- API: https://newsapi.org/

**The Guardian API** - Supplementary
- Free, extensive archive
- High-quality journalism
- Rich metadata

### Podcasts

**Podcast Index** - Primary
- Open, decentralized podcast database
- Free API access
- RSS feed aggregation
- API: https://podcastindex-org.github.io/docs-api/

**Apple Podcasts API** - Supplementary
- Comprehensive catalog
- Search and lookup

## Media Ingestion Pipeline

### Webhook-Based Third-Party Content

**Flow**:
1. External API/service sends webhook to Cloudflare Worker endpoint
2. Worker validates webhook signature (security)
3. Cloudflare Workflows initiates durable processing pipeline
4. Worker downloads media file to R2
5. Metadata extracted and normalized
6. If video: send to Cloudflare Stream for encoding
7. If image: send to Cloudflare Images for optimization
8. Store metadata in D1
9. Webhook confirms completion

**Supported Sources**:
- Artist upload platforms (DistroKid, Bandcamp, etc.)
- Content aggregators
- Direct API integrations
- Partner platforms

**Cloudflare Stream Webhooks**:
- Notify when video processing complete
- Success/error status
- Ready to stream confirmation

**Cloudflare Images Webhooks**:
- Upload success/failure notifications
- Optimization complete

**Security**:
- HMAC signature verification
- Rate limiting per source
- File type validation
- Malware scanning (Cloudflare's or third-party)
- Size limits

### Independent Artist Direct Upload

**Artist Portal** (React Admin UI):
1. Artist creates account (email verification)
2. Artist profile setup (bio, links, payment info)
3. Upload interface:
   - Drag-and-drop or file picker
   - Multi-file support (albums, series, collections)
   - Metadata form (title, description, genre, release date, etc.)
   - Cover art upload
   - Preview before submission
4. Processing status dashboard
5. Analytics post-release

**Upload Processing** (Cloudflare Workflows):
1. File uploaded directly to R2 via Worker
2. Workflow initiated for each file
3. File validation (format, size, integrity)
4. For music: extract ID3 tags, album art
5. For video: send to Stream for encoding
6. For books: extract metadata from EPUB/PDF
7. AI-assisted metadata enhancement (optional)
8. Content moderation queue (AI + human review)
9. Artist approval workflow
10. Publish to catalog

**Artist Benefits**:
- 100% royalties (we never take a cut)
- Own your content forever
- Direct relationship with fans
- Analytics and insights
- No corporate gatekeepers
- Open, transparent platform

**Content Moderation**:
- AI pre-screening (GPT-4 Vision, Claude)
- Human review for flagged content
- Transparent guidelines
- Appeals process
- Focus on safety, not censorship
- Multilingual support with human reviewers

**Supported Formats**:
- Music: MP3, FLAC, WAV, AAC, OGG
- Video: MP4, MOV, AVI, MKV (Stream handles encoding)
- Books: EPUB, PDF, MOBI
- Magazines: PDF, EPUB
- Podcasts: MP3, AAC

## Data Storage Strategy

### D1 Database Schema (Simplified)

**Users**
- id, email, password_hash, created_at
- country, state (for compliance)
- preferences (JSON), accessibility_settings (JSON)

**Media**
- id, type (movie/tv/book/music/news/podcast), source (api/user_upload)
- metadata (JSON - normalized from APIs)
- api_source (tmdb/openlibrary/musicbrainz/etc), api_id
- status (active/moderation/removed), uploaded_by (user_id if artist upload)

**UserLibrary**
- user_id, media_id, added_at
- progress (for video/audio/books), completed (boolean)

**Artists**
- id, user_id, display_name, bio, verified
- payment_info (encrypted), social_links (JSON)

**MediaFiles**
- id, media_id, type (video/audio/image/document)
- r2_path, stream_id (if video), size, format
- processing_status, webhook_data (JSON)

**MediaComments** (Timestamp/Location-Based)
- id, media_id, user_id, text, created_at, updated_at
- location_type (timestamp/page/paragraph/selection)
- location_data (JSON):
  - For music/video/podcast: `{timestamp_ms: 125000}` (2:05 into track)
  - For books: `{page: 42, chapter: 3, selection: "text span"}`
  - For articles: `{paragraph_id: "p-5", selection: "highlighted text"}`
- parent_comment_id (for threaded replies)
- likes_count, reports_count
- moderation_status (active/flagged/removed)

**Reviews**
- user_id, media_id, rating (1-5), title, text, created_at
- helpful_count, not_helpful_count

**UserLists**
- id, user_id, name, description, public (boolean)
- MediaListItems: list_id, media_id, order

**Follows**
- follower_id, following_id (user or artist), created_at

**Likes**
- user_id, target_type (comment/review/list), target_id, created_at

### R2 Object Storage

**Structure**:
```
/media/
  /movies/{tmdb_id}/
    poster.jpg
    backdrop.jpg
  /books/{isbn}/
    cover.jpg
  /music/{musicbrainz_id}/
    album_art.jpg
  /artists/{artist_id}/
    /uploads/{media_id}/
      original.{ext}
      processed.{ext}
/users/{user_id}/
  avatar.jpg
```

**Best Practices**:
- Immutable objects (don't overwrite)
- Versioning for user uploads
- Lifecycle policies (delete abandoned uploads after 30 days)
- Cache-Control headers for Cloudflare CDN
- Encryption at rest

### Workers KV

**Keys**:
- `session:{token}` → user session data
- `rate_limit:{api}:{identifier}` → API call tracking
- `trending:{type}:{timeframe}` → cached trending lists
- `feature_flag:{flag_name}` → feature toggles

**TTLs**:
- Sessions: 7 days
- Rate limits: 1 hour rolling window
- Trending: 15 minutes
- Feature flags: No expiration (manual updates)

## Country & State Compliance

**Privacy & Data Sovereignty**
- GDPR compliance (EU)
- CCPA compliance (California)
- Data localization where required (Cloudflare's global network helps)
- User data export/deletion tools

**Content Restrictions**
- Age-appropriate content filtering
- Regional availability (when legally required)
- Parental controls
- User preference-based filtering (not platform censorship)

**Implementation**:
- Detect user location (IP → country/state)
- Store user's legal jurisdiction in D1
- Apply relevant content filters
- Transparent about restrictions ("Not available in your region due to [law]")
- VPN users: rely on account settings, not IP

**Philosophy**:
- Comply with law to stay available
- Never proactive censorship
- Always transparent about why content unavailable
- User education about their rights

## Code Standards

### JavaScript/TypeScript
- ES2021+ features
- TypeScript for all new code (strict mode)
- ESLint + Prettier configured
- Single quotes, semicolons, 100 char width

### Accessibility
- Semantic HTML always
- ARIA labels where needed
- Keyboard navigation tested
- Screen reader tested (NVDA, JAWS, VoiceOver)
- Color contrast checker in CI/CD
- Focus indicators visible

### Testing
- Unit tests: Vitest
- E2E tests: Playwright (MCP integration available)
- Visual regression: Percy or Chromatic
- Accessibility: axe-core automated tests
- Load testing for Workers (k6)

### Performance
- Core Web Vitals targets (LCP < 2.5s, FID < 100ms, CLS < 0.1)
- Lighthouse score > 90
- Bundle size monitoring
- CDN caching aggressive
- Lazy loading for images/videos

## Development Workflow

### Local Development
- Wrangler for Workers/D1/R2 local dev
- React dev server (Vite)
- Mock API responses for third-party services
- Local SQLite for D1 emulation

### Deployment
- Cloudflare Pages for frontend (automatic from Git)
- Cloudflare Workers for API (wrangler deploy)
- D1 migrations (version controlled)
- Environment variables via Wrangler secrets

### CI/CD
- GitHub Actions or GitLab CI
- Automated tests on PR
- Preview deployments for all PRs
- Production deploys on main branch merge

## Open Source Philosophy

**What's Open**:
- All application code (frontend, backend, clients)
- Infrastructure as code
- Documentation
- Design system
- APIs

**What's Protected**:
- Security-critical code (only to prevent abuse)
- User data encryption keys
- API keys for third-party services
- Anti-fraud mechanisms

**Why**:
- Transparency builds trust
- Community contributions welcome
- Users can verify we do what we say
- No vendor lock-in

**License**:
- MIT or GPL (TBD - community input)
- No patents, no restrictions
- Fork-friendly

## Development Philosophy

**Always Remember**:
- Users own their content, not us
- Simplicity over cleverness
- Accessibility is not optional
- Artists deserve 100% of their earnings
- Open beats closed
- Privacy is a right
- Be available to everyone, everywhere
- The media is the star—UI serves the content
- When in doubt, ask the community

**Anti-Patterns to Avoid**:
- Corporate gatekeeping
- Dark patterns in UX
- Hidden fees or revenue sharing
- Closed-source "black boxes"
- Inaccessible interfaces
- Removing user content without transparency
- Following platform censorship trends

This is a platform for people, built by people, owned by people.
- Always remember to not rebuild something we already have. Do a search of the codebase before you start thinking about adding new features, to see if we already have it. This is a huge task, and we need to keep you going my guy.