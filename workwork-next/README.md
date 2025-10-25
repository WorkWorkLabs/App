# WorkWork Next

A Next.js frontend app for digital nomads, providing modules like Tasks (Earn), App Center, and Me (Profile).

## Tech Stack
- Next.js 16 (Turbopack)
- React 19
- TypeScript

## Pages & Routes
- `/explore` Explore
- `/feed` Plaza (Feed)
- `/apps` App Center (includes a "Solana Ecosystem Projects" section with external links)
- `/earn` Tasks Center (tabs: Popular / On-chain & Payments / Ecosystem Invites)
- `/me` Profile (connect Phantom & OKX Wallet, show SOL balance & points, jump to Earn)
- `/api/points` Points API (example response mapped by address length)

## Quick Start
```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Production
```bash
npm run build
npm run start -- -p 3006 -H 0.0.0.0
# Open http://localhost:3006
```

## Directory Overview (excerpt)
```
src/
  app/
    (tabs)/explore/page.tsx
    (tabs)/feed/page.tsx
    (tabs)/apps/page.tsx
    (tabs)/earn/page.tsx
    (tabs)/me/page.tsx
    api/points/route.ts
  components/
    TabBar.tsx
    SegmentedControl.tsx
```

## Scripts
- `npm run dev` Start development server
- `npm run build` Build for production
- `npm run start` Start production server (use `-p` for port, `-H` for host)

## Notes
- You may see a multiple lockfiles warning (`package-lock.json` + `pnpm-lock.yaml`). Either:
  - Standardize on one package manager, or
  - Configure `turbopack.root` / `outputFileTracingRoot` in `next.config.ts`
- Recommended Node.js: 18+

## Contributing
Feedback and PRs are welcome.

## License
See `LICENSE` in the repository root.
