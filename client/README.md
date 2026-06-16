# getSher Client

**Live Link:** [getSher Live App](https://get-sher-taxm.vercel.app/)

getSher is a cricket live-score frontend built with React, Vite, Tailwind CSS, TanStack Query, Redux Toolkit, and Socket.IO. It includes a public cricket dashboard, authentication screens, admin management pages, and a live scoring workflow that updates scores and commentary in real time.

## Repository

GitHub: [sharatkatwa/getSher](https://github.com/sharatkatwa/getSher)

This repository is a monorepo:

```txt
getSher/
  client/   React + Vite frontend
  server/   Express + MongoDB + Socket.IO backend
```

## Features

- Public home dashboard with live matches, recent matches, upcoming matches, scores, and commentary.
- Real-time score and commentary updates through Socket.IO.
- Public list pages for players, teams, series, and matches.
- Login, register, Google auth redirect, profile menu, and logout.
- Protected admin panel for `SUPER_ADMIN`, `ADMIN`, and `SCORER` roles.
- Admin pages for dashboard, players, teams, series, matches, playing XI, and live scoring.
- Reusable design tokens and shared UI components.
- Vercel-ready SPA routing with `vercel.json`.

## Tech Stack

- React 19
- Vite
- Tailwind CSS v4
- React Router
- TanStack Query
- Redux Toolkit
- React Hook Form
- Axios
- Socket.IO Client
- Lucide React

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local `.env` file:

```bash
cp .env.example .env
```

Set the environment variables:

```env
VITE_API_URL=http://localhost:3000/api
VITE_SOCKET_URL=http://localhost:3000
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Environment Variables

| Variable | Description | Example |
| --- | --- | --- |
| `VITE_API_URL` | Backend API base URL | `https://your-backend-domain.com/api` |
| `VITE_SOCKET_URL` | Backend Socket.IO server URL | `https://your-backend-domain.com` |

## Vercel Deployment

When deploying from the monorepo, configure Vercel like this:

| Setting | Value |
| --- | --- |
| Root Directory | `client` |
| Framework Preset | `Vite` |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Add these environment variables in Vercel:

```env
VITE_API_URL=https://your-backend-domain.com/api
VITE_SOCKET_URL=https://your-backend-domain.com
```

The included `vercel.json` rewrites all routes to `index.html`, so direct refreshes on routes like `/login`, `/teams`, and `/admin` work correctly.

## Backend Requirements

The frontend expects the backend to provide:

- REST API under `/api`
- Cookie-based auth
- Google OAuth route at `/api/auth/google`
- Socket.IO server on the backend root URL
- Public endpoints for home, players, teams, series, matches, scores, and commentary
- Protected admin endpoints for managing cricket data

Update the backend `CORS_ORIGIN` to include your deployed frontend URL:

```env
CORS_ORIGIN=http://localhost:5173, https://get-sher-taxm.vercel.app
```

## Scripts

```bash
npm run dev      # Start Vite dev server
npm run build    # Create production build
npm run preview  # Preview production build locally
npm run lint     # Run ESLint
```

## Notes

- The backend must be deployed separately before the production client can fetch live data.
- For Google login in production, add the deployed backend callback URL in Google Cloud OAuth settings.
