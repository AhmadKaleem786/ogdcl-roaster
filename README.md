# OGDCL Duty Roster Tracker

A React + Ant Design app for tracking OGDCL's 21-day duty / 21-day off rotation.

## Features

- **Duty Calendar** — Visual calendar showing duty and off days based on your start date
- **Future Date Lookup** — Check whether you'll be on duty or off on any future date
- **Persistent profile** — Your details are saved locally and can be updated anytime

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Project Structure

```
src/
├── core/           # Shared business logic (rota calculator, storage, types)
├── modules/        # Feature modules (add new modules here + register in registry.ts)
├── components/     # Shared UI (layout, onboarding, profile)
├── hooks/          # React hooks
└── theme/          # Ant Design theme (OGDCL branding)
```

## Adding a New Module

1. Create a folder under `src/modules/your-module/`
2. Export a component that accepts `{ profile: UserProfile }`
3. Register it in `src/modules/registry.ts`

## Rota Logic

The cycle is 42 days: 21 days on duty, then 21 days off. Provide either:
- The date your **current duty** started, or
- The date your **current days off** started

The app calculates all past and future dates from that anchor.
