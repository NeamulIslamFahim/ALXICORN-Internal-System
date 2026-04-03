# ALXICORN Internal System Dashboard

A lightweight Next.js dashboard for the governance requirements.

## What is included

- Account management overview
- Role and permission matrix
- Team management table
- Session and policy tracking
- Data requirement field map

## Tech

- React
- Next.js
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
5. Vercel should detect Next.js automatically and use:
   - Install Command: `npm install`
   - Build Command: `npm run build`
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

- The current repository contains a frontend-only Next.js app in `frontend`.
- There is no separate backend service in this repository yet, so Vercel will deploy the UI as a Next.js application.

## File structure

- `frontend/app/` - Next.js app router entry
- `frontend/src/userManagement/App.jsx` - dashboard composition
- `frontend/src/userManagement/pages/` - route-like page screens
- `frontend/src/userManagement/components/forms/` - form controls and modal editors
- `frontend/src/userManagement/components/layout/` - layout and shell UI
- `frontend/src/userManagement/components/tables/` - table views and badges
- `frontend/src/userManagement/context/` - shared app context
- `frontend/src/userManagement/utils/` - local storage and UI helpers
- `frontend/src/userManagement/styles.css` - layout and theme
