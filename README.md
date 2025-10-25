# WorkWork

WorkWork is an open-source suite for digital nomads. This repository currently includes a Next.js frontend application.

## Repository Structure
- `workwork-next/` Frontend app (Next.js 16 + React 19 + TypeScript)
- `workwork-next/public/` Static assets

## Feature Overview
- Earn (Tasks): Popular / On-chain & Payments / Ecosystem invites, with WW points display and actions
- App Center: "Solana Ecosystem Projects" section with external links
- Me (Profile): Connect Phantom and OKX Wallet, show SOL balance and points, quick navigation to Earn
- API: `/api/points` returns example points for demonstration

## Quick Start
1. Go to the frontend directory:
   ```bash
   cd workwork-next
   npm install
   ```
2. Development (default port 3000):
   ```bash
   npm run dev
   # Open http://localhost:3000
   ```
3. Production build & start (example port 3006):
   ```bash
   npm run build
   npm run start -- -p 3006 -H 0.0.0.0
   # Open http://localhost:3006
   ```

## Source Layout (workwork-next/src)
- `app/(tabs)/explore` Explore page
- `app/(tabs)/feed` Plaza (Feed) page
- `app/(tabs)/apps` App Center
- `app/(tabs)/earn` Earn (Tasks) page
- `app/(tabs)/me` Me (Profile) page
- `app/api/points` Example points API
- `components/` TabBar, SegmentedControl, etc.

## Development Notes
- You may see a warning about multiple lockfiles during build/start (both `package-lock.json` and `pnpm-lock.yaml`). To silence:
  - Use a single package manager (keep only one lockfile), or
  - Configure `turbopack.root` / `outputFileTracingRoot` in `next.config.ts`
- Recommended Node.js version: 18+

## Contributing
Issues and PRs are welcome.

## License
See the root `LICENSE` file.