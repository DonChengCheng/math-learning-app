# Bug Analysis: Register API 500 Internal Server Error

## Bug Description
The `/api/auth/register` endpoint returns a 500 Internal Server Error when attempting to register a new user.

## Root Cause
The application is configured to use Prisma's managed database service (`prisma+postgres://localhost:51213/...`), but the database service was not running. This caused all database operations to fail with connection errors.

## Reproduction Steps
1. Start the Next.js development server with `npm run dev`
2. Navigate to `/auth/signup`
3. Fill in the registration form
4. Submit the form
5. Observe 500 error in browser console

## Fix Implemented
1. Started Prisma development server using `npx prisma dev`
2. Added `directUrl` configuration to schema.prisma for direct database connections
3. Pushed database schema using `npx prisma db push`
4. Verified fix by successfully registering a test user

## Implementation Details
1. Added DIRECT_URL to .env for direct PostgreSQL connection
2. Updated prisma/schema.prisma to include directUrl configuration
3. Started Prisma dev server in background: `nohup npx prisma dev > prisma-dev.log 2>&1 &`
4. Successfully created database tables and tested registration

## Test Results
- Successfully registered user: test@example.com
- API returns 200 OK with user data
- User is correctly saved in database

## Notes for Developers
- Prisma dev server must be running: `npx prisma dev`
- Server runs on ports 51213-51215
- Can check logs in prisma-dev.log
- For production, use proper PostgreSQL instance