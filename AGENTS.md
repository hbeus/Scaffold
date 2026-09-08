# base

## Stack

TanStack Start (SSR/Nitro) + TanStack Router (folder-based) + React Query · StyleX · Base UI (`@base-ui/react`) · motion.dev (`motion/react`) · Zustand · Drizzle ORM + PostgreSQL (pgvector) · Tabler Icons (`@tabler/icons-react`) · Biome · Vitest · Node 22, pnpm 11

Component library: `@base/ui` (Base UI + StyleX + motion). Optional 3D: `@base/canvas` (R3F + drei + DialKit). Charts: `@base/charts` (VisX + motion, theme tokens from `@base/ui`). GPU backgrounds: `@base/shaders` (OGL + compound `Shader` API; see `docs/adr/0001-shaders-package-route.md`, `docs/adr/0003-shaders-next-phase-catalog-pointer-color.md`).

## Design rules

- **Component hierarchy**: atoms (`packages/ui/`) → molecules (`components/`) → features (`features/{domain}/`). If you'd copy it to another project, it's a molecule. If it's domain-specific, it's a feature. Atoms are organized by domain: `input/` (Button, Input, Toggle, Pressable), `layout/` (Card), `typography/` (Text), `overlays/` (Dialog), `navigation/` (Tabs, TreeView, …).
- **Compound component pattern**: all UI atoms use `Component.Root > Component.Trigger > Component.Content` etc. Follow existing components in `packages/ui/`.
- **StyleX only**: `stylex.create()` for all styles. Always use design tokens from `@base/ui/tokens/*` — never hardcode colors, sizes, or typography. Variants via `stylex.props(styles.base, styles[variant])`, no CVA.
- **React Query**: co-locate key factories in `features/{domain}/queries.ts`. Use `queryOptions()`. Server data via `createServerFn`.

## Pointers

- **Design tokens**: see `packages/ui/src/tokens/` — `spacing` (padding/gaps), `size` (dimensions), `elementSize` (sm/md/lg component heights), `colors`, `radii`, `typography`
- **Agent guide**: see `packages/ui/AGENTS.md` (or `CLAUDE.md`) for @base/ui structure and key decisions
- **motion.dev**: use `/motion` skill or motion MCP — do not rely on training data for motion APIs
- **Figma**: invoke `/figma-use` skill before calling `use_figma`
- **Deploy**: Dokploy MCP, or push to `main` (auto-deploys). Host: Hetzner VPS (`ssh hetzner`), Traefik proxy
- **Local Postgres**: `docker compose -f docker-compose.dev.yml up -d`
- **DB migrations**: `pnpm db:generate` then `pnpm db:migrate`. Studio: `pnpm db:studio`

## Constraints

- `minimumReleaseAge: 10080` in `pnpm-workspace.yaml` — 7-day minimum package age
- Production env vars managed via Dokploy
