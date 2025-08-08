# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Database operations
npx prisma generate          # Generate Prisma client
npx prisma db push          # Push schema changes to database
npx prisma studio           # Open database GUI
npx prisma db seed          # Run basic seed data

# Comprehensive seed commands (run one at a time)
npm run seed                # Basic seed
npm run seed-complete       # Complete curriculum
npm run seed-university     # High school + university content
npm run seed-all           # Full education system

# Linear algebra specific operations
npm run seed-linear-algebra        # Seed linear algebra content
npm run clean-linear-algebra       # Clean linear algebra data
npm run verify-linear-algebra      # Verify linear algebra setup
```

## Project Architecture

### Core Technology Stack
- **Framework**: Next.js 15 with App Router and Turbopack
- **Language**: TypeScript with strict mode
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js v5 with JWT strategy
- **Styling**: Tailwind CSS v4
- **Math Rendering**: KaTeX via react-katex
- **UI Components**: Custom components with Radix UI primitives

### Database Schema Overview
The application follows a hierarchical content structure:
- **User** → **Progress** → **Course** → **Chapter** → **Lesson** → **Problem**
- **User** → **Submission** (problem attempts)
- **User** → **Achievement** (gamification)

Key relationships:
- Users have many Progress records (per course/lesson)
- Courses contain Chapters, which contain Lessons
- Lessons can have associated Problems
- Problems track user Submissions
- All progress is tracked at both course and lesson levels

### Authentication Architecture
- **Configuration**: Split between `auth.config.ts` (providers) and `auth.ts` (main config)
- **Adapter**: Prisma adapter for database sessions
- **Strategy**: JWT with session callbacks
- **Middleware**: Route protection in `middleware.ts`
- **Protected Routes**: `/dashboard`, `/courses/*`, `/practice/*`
- **Auth Routes**: `/auth/signin`, `/auth/signup` (auto-redirect if logged in)

### API Route Structure
- **RESTful design**: `/api/courses`, `/api/courses/[id]`, etc.
- **Authentication**: Uses `auth()` helper for session management
- **Error handling**: Consistent JSON error responses
- **Data fetching**: Server-side data fetching with Prisma queries

### Content Management System
- **Course Library**: Located in `lib/courses.ts` with comprehensive CRUD operations
- **Progress Tracking**: Automatic progress calculation and updates
- **Recommendations**: Algorithm-based course recommendations
- **Seeding**: Multiple seed scripts for different content levels

## Development Guidelines

### Database Operations
- Always use the shared Prisma instance from `@/lib/prisma`
- Use the helper functions in `@/lib/courses.ts` for course-related operations
- Test database connections with `testDatabaseConnection()` helper
- Use graceful shutdown with `disconnectPrisma()` in production

### Authentication Patterns
```typescript
// In API routes
import { auth } from '@/auth'
const session = await auth()
if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

// In components
import { useSession } from 'next-auth/react'
const { data: session, status } = useSession()
```

### Data Fetching Patterns
- Use server components for initial data loading
- Use the course library functions for complex queries
- Include user progress when displaying courses to authenticated users
- Always handle loading and error states

### Component Structure
- **Layout**: Single root layout with font configuration and session provider
- **UI Components**: Located in `@/components/ui/` with consistent styling
- **Providers**: Session management in `@/components/providers/session-provider.tsx`
- **Math Rendering**: Use `@/components/ui/math-content.tsx` for KaTeX integration

## File Organization

### Key Directories
- `/app` - Next.js App Router pages and API routes
- `/lib` - Shared utilities and database operations
- `/components` - Reusable UI components and providers
- `/prisma` - Database schema and seed scripts
- `/types` - TypeScript type definitions
- `/data` - Static content data

### Important Files
- `middleware.ts` - Route protection and authentication redirects
- `auth.ts` & `auth.config.ts` - Authentication configuration
- `lib/prisma.ts` - Database client with connection helpers
- `lib/courses.ts` - Complete course management system
- `prisma/schema.prisma` - Database schema with comprehensive education model

## Environment Setup

Required environment variables:
```bash
DATABASE_URL="postgresql://..."
NEXTAUTH_SECRET="..."
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup Sequence
1. Ensure PostgreSQL is running
2. Set DATABASE_URL in environment
3. Run `npx prisma generate`
4. Run `npx prisma db push`
5. Choose appropriate seed command based on content needs

## Testing and Quality

### Code Quality
- TypeScript strict mode enabled
- ESLint with Next.js configuration
- Path aliases configured (`@/*` maps to root)

### Database Testing
- Use `testDatabaseConnection()` helper for connectivity checks
- Seed scripts include verification and cleanup options
- Prisma client includes development logging for debugging