# NovaDev - URL Shortener

## Project Overview
Personal URL shortener service built with Next.js 15. This service provides short URL redirection with a clean, modern interface.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Runtime**: Node.js

## Environment Variables
- `API_URL`: External API endpoint for URL shortening service
- `API_KEY`: Bearer token for API authentication
- `NEXT_PUBLIC_COUNTDOWN_SECONDS`: Countdown duration for redirect page (default: 5)

## Key Features
- Dynamic URL routing using `[url]` parameter
- API integration with external URL shortening service
- Automatic redirection with countdown timer
- Responsive design with modern UI
- Error handling with fallback to not-found page

## Project Structure
```
src/
├── app/
│   ├── [url]/           # Dynamic URL redirect page
│   ├── api/short-urls/[short_code]/  # API route for fetching URLs
│   ├── not-found/       # 404 page
│   ├── page.tsx         # Home page
│   └── layout.tsx       # Root layout
```

## Development Commands
```bash
npm run dev      # Start development server on port 3002
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## API Integration
- GET `/api/short-urls/{short_code}` fetches URL data from external API
- Uses Bearer token authentication
- Handles success/error responses for redirection logic

## Important Notes
- Runs on port 3002 by default
- Uses PM2 for production process management
- Environment variables should be configured in `.env` file

## Git Workflow
- **Branch**: All development should be done on the `main` branch
- **Commit**: Always commit changes with descriptive messages
- **Push**: Always push commits to remote origin and person after committing
- **Workflow**: `git add .` → `git commit -m "message"` → `git push origin main && git push person main`