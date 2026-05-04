# Constructo

[![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)

**Live Site:** [construco.devctr.com](https://construco.devctr.com)

Open source mobile-first e-commerce platform built for school end-term project. Features real-time functionality, seller dashboards, and a secure marketplace experience.

## Tech Stack

| Category | Technology |
|----------|------------|
| **Framework** | Next.js 16 (React 19) + TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Database** | Supabase (PostgreSQL) |
| **Authentication** | Supabase Auth |
| **Storage** | Supabase Storage |
| **Caching** | Upstash Redis |
| **Deployment** | Vercel |
| **Maps** | OpenLayers |

## Features

### User Features
- **Authentication**: Email/password signup, login, session management
- **Product Browse**: Search, filter, and view product details
- **Shopping Cart**: Add/remove items, quantity updates
- **Orders**: View order history and status tracking
- **Profile Management**: Personal information, addresses, seller application

### Seller Features
- **Seller Dashboard**: Product management, order fulfillment
- **Application System**: Submit seller applications with document upload
- **Inventory Management**: Add/edit/remove products

### Technical Features
- **Mobile-First Design**: Responsive across all devices
- **Real-time Updates**: Redis-based pub/sub for notifications
- **Address Management**: Full CRUD with Philippine address lookup (PSGC)
- **Image Upload**: AWS S3 integration for product images
- **Email Notifications**: Order confirmations and updates

## Project Structure

```
/components
  /screen
    /mobile      # Mobile UI components
    /desktop     # Desktop UI components
  /ui            # Reusable UI elements

/app
  /api           # API routes
    /userData    # User profile data
    /register    # User registration
    /login       # Authentication
    /applySeller # Seller applications
    /psgc       # Philippine address lookup
  /auth         # Auth callbacks
  /dash         # Dashboard
  /seller       # Seller pages
  /payment      # Payment processing
```

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Redis instance (Upstash recommended)

### Installation

```bash
git clone https://github.com/yourusername/project.git
cd project
npm install
```

### Environment Variables

Create `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
UPSTASH_REDIS_REST_URL=your_redis_url
UPSTASH_REDIS_REST_TOKEN=your_redis_token
```

### Development

```bash
npm run dev
# Open http://localhost:3000
```

### Build

```bash
npm run build
npm start
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | User registration |
| `/api/login` | POST | User authentication |
| `/api/userData` | GET | Fetch user profile |
| `/api/applySeller` | POST | Submit seller application |
| `/api/setAddress` | POST | Add new address |
| `/api/rmAddr` | POST | Remove address |
| `/api/psgc` | GET | Philippine address lookup |
| `/api/reviewApi` | POST | Submit product reviews |

## Database Schema

Key tables managed by Supabase:

- `profiles` - User profile data
- `products` - Product listings
- `orders` - Order records
- `addresses` - User addresses
- `seller_applications` - Seller requests

## Contributing

Open to contributions! This project serves as a learning platform.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - open source project for educational purposes.

---

**Project Status**: Active development for academic requirements