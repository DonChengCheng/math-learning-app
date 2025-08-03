# Bug Fix Log

## [2025-01-03] Fix ReactMarkdown className Prop Error

### Issue
- **Error**: Runtime Assertion - "Unexpected 'className' prop, remove it"
- **Location**: `components/ui/math-content.tsx` line 43
- **Cause**: ReactMarkdown v10+ no longer accepts `className` as a direct prop

### Solution
- Moved `className` prop from ReactMarkdown component to its wrapper div
- Combined prose classes with the custom className parameter
- Preserved all existing styling functionality

### Files Modified
- `components/ui/math-content.tsx` - Removed className from ReactMarkdown, applied to wrapper div

### Verification
- Development server starts without errors
- Linting passes with no new issues
- TypeScript compilation issues are pre-existing and unrelated to this fix

### Impact
- Fixes runtime error preventing proper rendering of lesson content
- No visual changes to the UI
- Maintains all existing Markdown and LaTeX math rendering functionality

## [2025-01-03] Fix Port Mismatch - Dashboard Connection Error

### Issue
- **Error**: "This site can't be reached" when accessing localhost:3001/dashboard
- **Error Code**: ERR_CONNECTION_REFUSED
- **Cause**: Port mismatch between development server (running on 3000) and environment configuration (pointing to 3001)

### Solution
- Updated NEXTAUTH_URL in both `.env` and `.env.local` from port 3001 to 3000
- Restarted development server to apply environment variable changes
- Verified server accessibility and authentication redirects work correctly

### Files Modified
- `.env` - Updated NEXTAUTH_URL from localhost:3001 to localhost:3000
- `.env.local` - Updated NEXTAUTH_URL from localhost:3001 to localhost:3000

### Verification
- ✅ Homepage accessible (HTTP 200)
- ✅ Dashboard redirects properly for authentication (HTTP 302)
- ✅ Server logs show successful compilation and routing
- ✅ Authentication flow now works correctly

### Impact
- Fixes connection errors when accessing the dashboard
- Resolves authentication redirect issues
- Ensures proper NextAuth.js functionality
- No code changes required - environment configuration fix only