# construco

[![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 Live Site: https://construco.devctr.com

📌 Status: Open-source academic end-term project

## Overview

construco is a mobile-first e-commerce platform tailored for the Philippine market. It connects local sellers and buyers through a streamlined, real-time experience with strong emphasis on accessibility, performance, and regional accuracy.

A key highlight is its integration with PSGC (Philippine Standard Geographic Code), enabling precise address handling and improving delivery workflows.

## Architecture

Below is the system architecture showing how frontend, backend, services, and deployment interact:

### High-Level Breakdown

#### Frontend
- Next.js + React (Web & Mobile-first UI)
- Chromium-based rendering for cross-platform consistency
- Communicates via REST APIs

#### Backend
- Supabase (PostgreSQL + Auth + Realtime)
- Handles business logic, authentication, and database operations

#### Services Layer
- Redis → caching, pub/sub, rate limiting
- OpenAI → AI-powered features (if applicable)
- Brevo → transactional emails
- Cloudflare → CDN + edge optimizations

#### Database
- PostgreSQL via Supabase

#### Realtime
- WebSockets powered by Supabase for live updates (orders, notifications)

#### Authentication
- Supabase Auth (JWT-based session management)

#### CI/CD & Deployment
- GitHub + Git for version control
- Vercel for hosting and edge deployment
- Cloudflare R2 for object storage (images, assets)

## Tech Stack

| Layer               | Technology                                  |
|---------------------|---------------------------------------------|
| Frontend            | Next.js 16, React 19, TypeScript            |
| Styling             | Tailwind CSS v4, CSS Modules                |
| Backend             | Supabase (PostgreSQL, Auth, Storage)        |
| Realtime & Cache    | Upstash Redis                               |
| Storage             | Cloudflare R2                               |
| Email Service       | Brevo                                       |
| Deployment          | Vercel Edge Network                         |

## Features

### Buyer Features
- Secure authentication (email/password)
- Smart product search & filtering
- Persistent shopping cart
- Real-time order tracking
- PSGC-powered address system

### Seller Features
- Seller onboarding & approval system
- Product management (CRUD)
- Order fulfillment workflow
- Dashboard analytics

### Platform Highlights
- Real-time updates via Redis + Supabase
- Mobile-first responsive UI
- Optimized image delivery (Next.js + R2)
- Region-aware logistics (PSGC integration)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd project
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

# Cloudflare R2
R2_ACCESS_KEY_ID=
R2_SECRET_ACCESS_KEY=
R2_BUCKET_NAME=
R2_ACCOUNT_ID=

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Run the Project

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## API Overview

### Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user

### User
- `GET /api/userData` - Get user data
- `POST /api/avatar` - Upload user avatar

### Marketplace
- `POST /api/applySeller` - Apply to become a seller
- `POST /api/approveSeller` - Approve a seller application
- `POST /api/reviewApi` - Review API endpoint (placeholder)
- `POST /api/upload` - Upload file (e.g., product image)

### Address & Location
- `GET /api/psgc` - Get PSGC data
- `POST /api/setAddress` - Set user address
- `GET /api/showAddr` - Show user addresses
- `POST /api/rmAddr` - Remove user address

## Contributing

This project is primarily for academic purposes, but contributions are welcome.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some feature'`)
5. Push to the branch (`git push origin feature/your-feature`)
6. Open a Pull Request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Maintainer

John David L. Perez