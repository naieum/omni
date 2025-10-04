# Omni

**The last stop for all media. Own your content forever.**

Omni is an open-source media platform where users truly own their library. Access TV shows, movies, books, magazines, newspapers, and music on-demand, while empowering independent artists to share their work directly with audiences.

## Core Philosophy

- **User Ownership First** - Your media library is yours forever. No corporate gatekeeping.
- **Open & Transparent** - All code is open source. No patents, no hidden agendas.
- **Universal Access** - Available to everyone, everywhere, always.
- **Artist Empowerment** - 100% royalties to independent creators. No middlemen.

## Project Status

🚧 **In Development** - We're just getting started!

Currently building the foundation with a vertical slice MVP focusing on music.

## Technology Stack

- **Frontend**: React + Vite, deployed on Cloudflare Pages
- **Backend**: Cloudflare Workers (serverless API)
- **Database**: Cloudflare D1 (serverless SQLite)
- **Storage**: Cloudflare R2 (object storage, zero egress fees)
- **Streaming**: Cloudflare Stream (video encoding & delivery)

## Project Structure

```
omni/
├── frontend/       # React web application
├── workers/        # Cloudflare Workers (API)
├── database/       # D1 database migrations
├── docs/           # Documentation
└── CLAUDE.md       # Development guide for AI assistants
```

## Getting Started

*Coming soon - project setup instructions*

## Roadmap

**Phase 1** (Current): Foundation + Music Player
- Cloudflare infrastructure setup
- Basic music search & playback (MusicBrainz integration)
- User authentication

**Phase 2**: Social Features
- Timestamp comments (like SoundCloud, but for all media)
- User library management
- Reviews and ratings

**Phase 3**: Artist Platform
- Direct upload for independent musicians
- Artist profiles
- Webhook-based ingestion

**Phase 4**: Expand Media Types
- Movies & TV (TMDb + Cloudflare Stream)
- Books (Open Library)
- Podcasts, News, Magazines

**Phase 5**: AI Features
- Personalized recommendations
- Smart search
- Content discovery

**Phase 6**: Thin Clients
- iOS/iPadOS (Swift/SwiftUI)
- Android (Kotlin)
- Roku (BrightScript)
- Apple TV (tvOS)
- And more...

## Contributing

We welcome contributions! This is a platform for the people, built by the people.

*Contribution guidelines coming soon*

## License

*License TBD - Will be MIT or GPL with community input*

## Learn More

See [CLAUDE.md](./CLAUDE.md) for comprehensive development documentation.

---

**Built with ❤️ for users and artists, not corporations.**
