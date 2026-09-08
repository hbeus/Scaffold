# base

A monorepo starter template for building full-stack web applications with modern tooling.

## What's inside

- **TanStack Start** — full-stack React framework with SSR (Nitro)
- **StyleX** — compile-time atomic CSS with type-safe tokens
- **Base UI** — headless, accessible React components
- **motion.dev** — production-grade animations
- **Drizzle ORM** — type-safe PostgreSQL access
- **Biome** — fast linting and formatting

## Structure

```
apps/web/           → TanStack Start application
packages/ui/        → Styled component library (Base UI + StyleX + motion)
packages/db/        → Drizzle ORM + PostgreSQL
packages/canvas/    → Optional React Three Fiber setup
```

## Component library (`@base/ui`)

Styled components built on Base UI + StyleX + motion, organized by domain:

```
packages/ui/src/
  components/
    input/        Button, Input, Toggle, Pressable
    layout/       Card
    typography/   Text
    overlays/     Dialog
    navigation/   Tabs, TreeView, Toolbar, Sidebar, …
  tokens/         Design tokens (themes, spacing, size, radii, typography, …)
  providers/      ComponentConfigProvider (app-wide component defaults)
  types/          Shared polymorphic type utilities
  utils/          styleArray, mergeProps, mergeRefs
```

Colors use OKLCH. Defaults are default-dark via `defineVars()`; other palette/scheme themes via `createTheme()` / `themeMap` on `<html>`. See `packages/ui/AGENTS.md` and the docs Theming guide.

## Getting started

```bash
# Install dependencies
pnpm install

# Start local database
docker compose -f docker-compose.dev.yml up -d

# Copy environment variables
cp .env.example .env

# Run database migrations
pnpm db:migrate

# Start dev server
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

## Deployment

The included setup is a personal configuration: Docker containers deployed via [Dokploy](https://dokploy.com) on a [Hetzner](https://www.hetzner.com) VPS, with push-to-`main` auto-deploys. If you're using this as a template, replace the Dockerfile, compose files, and deployment config with whatever suits your infrastructure — Vercel, Fly.io, Railway, bare metal, etc. Also update `CLAUDE.md` — it contains project-specific pointers (deploy targets, SSH aliases, MCP tools) that you'll want to rewrite for your own setup.

```bash
# Build and run production locally
docker compose up --build
```

## License

MIT
