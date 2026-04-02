# ALXICORN Internal System Dashboard

A lightweight React dashboard for the governance requirements.

## What is included

- Account management overview
- Role and permission matrix
- Team management table
- Session and policy tracking
- Data requirement field map

## Tech

- React
- Vite
- Plain CSS

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

This repository is configured so you can import the project from the repository root in Vercel.

### Option 1: Vercel dashboard

1. Push this project to GitHub.
2. Go to Vercel and click `Add New -> Project`.
3. Import the GitHub repository.
4. Keep the project root as the repository root.
5. Vercel should use:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `frontend/dist`
6. Click `Deploy`.

### Option 2: Vercel CLI

```bash
npm install -g vercel
vercel
```

For production deployment:

```bash
vercel --prod
```

## Notes

- The current repository contains a frontend-only Vite app in `frontend`.
- There is no separate backend service in this repository yet, so Vercel will deploy the UI as a static site.

## File structure

- `src/App.jsx` - dashboard composition
- `src/data/dashboardData.js` - content and requirement-driven mock data
- `src/components/` - reusable UI pieces
- `src/styles.css` - layout and theme
