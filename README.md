# Constructo

[![Next.js 16](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white)](https://redis.io)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)

**🌐 Live Site:** [construco.devctr.com](https://construco.devctr.com)

> **Open source mobile-first e-commerce platform** built for school end-term project. Features real-time functionality, seller dashboards, and a secure marketplace experience.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Overview

Constructo is a comprehensive e-commerce solution designed for mobile-first commerce with:

- **Multi-role system**: Buyers, sellers, and admin dashboard
- **Real-time capabilities**: Redis pub/sub for notifications and updates
- **Philippine market focus**: Native PSGC address integration
- **Cloud-native architecture**: Deployed on Vercel with Supabase backend

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 16, React 19, TypeScript 5 |
| **Styling** | Tailwind CSS v4, CSS Modules |
| **Backend/Database** | Supabase (PostgreSQL, Auth, Storage) |
| **Caching/Messaging** | Upstash Redis (Rate limiting, Pub/Sub) |
| **Storage** | AWS S3 (product images) |
| **Deployment** | Vercel (CI/CD, Edge Network) |
| **Maps** | OpenLayers |

## Features

### 🛍️ User Features
- **Authentication**: Email/password signup, login, password reset, session management
- **Product Discovery**: Search, category browsing, product details with image gallery
- **Shopping Cart**: Add/remove items, quantity adjustments, persistent cart
- **Order Management**: Order history, status tracking, order details view
- **Profile**: Personal info, multiple addresses, seller application status

### 🏪 Seller Features
- **Seller Dashboard**: Analytics overview, order management, earnings tracking
- **Product Management**: Add/edit/delete products with image uploads
- **Order Fulfillment**: Update order status, manage shipping
- **Application System**: Submit documents for seller approval

### ⚙️ Technical Features
- **Mobile-First Design**: Responsive layout with adaptive navigation
- **Real-time Notifications**: Redis pub/sub for instant updates
- **Address Management**: Full CRUD with Philippine Standard Geographic Code (PSGC)
- **Image Optimization**: Next.js Image component with AWS S3 integration
- **Email Service**: Order confirmations and status updates

## Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Client (UX)   │────▶│   Vercel Edge   │────▶│  Upstash Redis  │
└─────────────────┘     └────────┬────────┘     └─────────────────┘
                                 │
                                 ▼
                        ┌─────────────────┐
                        │   Supabase      │
                        │  - PostgreSQL   │
                        │  - Auth         │
                        │  - Storage      │
                        └─────────────────┘
```

## Project Structure

```
/app
  /api                 # API routes (RESTful endpoints)
    /userData
    /register
    /login
    /applySeller
    /psgc
    /reviewApi
    /upload
  /auth                # Auth callbacks
  /dash                # Admin dashboard
  /seller              # Seller pages
  /payment             # Checkout flow

/components
  /screen              # Page-level components
    /mobile            # Mobile views
    /desktop           # Desktop views
  /ui                  # Reusable UI components
  /hooks               # Custom React hooks

/lib
  /supabase            # Supabase client configurations
  /utils               # Utility functions
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free tier works)
- Upstash Redis account
- AWS S3 bucket (for image uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/project.git
cd project

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create `.env.local` in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Redis (Upstash)
UPSTASH_REDIS_REST_URL=https://your-instance.upstash.io
UPSTASH_REDIS_REST_TOKEN=your-token

# AWS S3
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=your-region
AWS_S3_BUCKET=your-bucket-name

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Development

```bash
# Run development server
npm run dev

# Run linting
npm run lint

# Build for production
npm run build
npm start
```

## API Reference

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/register` | POST | User registration with email verification |
| `/api/login` | POST | User authentication |

### User Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/userData` | GET | Fetch authenticated user profile |
| `/api/set-role` | POST | Set user role (user/seller/admin) |
| `/api/avatar` | POST | Upload user avatar |

### E-commerce

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/applySeller` | POST | Submit seller application |
| `/api/approveSeller` | POST | Approve/reject seller (admin) |
| `/api/reviewApi` | POST | Submit product review |
| `/api/upload` | POST | Upload product images to S3 |

### Address Management

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/setAddress` | POST | Add new address |
| `/api/showAddr` | GET | List user addresses |
| `/api/rmAddr` | POST | Delete address |
| `/api/psgc` | GET | Philippine address lookup |

### Utilities

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/send-email` | POST | Send transactional emails |
| `/api/getUsers` | GET | Fetch all users (admin) |

## Database Schema

Supabase manages the following key tables:

- **profiles** - User profile data (name, email, role, seller status)
- **products** - Product listings with pricing, inventory, images
- **orders** - Order records with status, totals, shipping info
- **addresses** - User addresses with PSGC integration
- **seller_applications** - Seller application documents and status
- **reviews** - Product reviews and ratings

## Screenshots

> _Mobile-first interface with adaptive layouts_

| Home Screen | Product Details | Seller Dashboard |
|-------------|-----------------|------------------|
| ![Home](https://via.placeholder.com/300x600/FF6B35/FFFFFF?text=Home) | ![Details](https://via.placeholder.com/300x600/4ECDC4/FFFFFF?text=Product) | ![Dashboard](https://via.placeholder.com/300x600/1A535C/FFFFFF?text=Dashboard) |

## Contributing

This is an open source academic project. Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

MIT License - Open source project for educational purposes.

---

**Status:** ✅ Active development for academic requirements
**Maintainer:** School End-Term Project Team