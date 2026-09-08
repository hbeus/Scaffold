FROM node:22-alpine AS base
RUN corepack enable && corepack prepare pnpm@11.9.0 --activate
WORKDIR /app

# Install dependencies
FROM base AS deps
COPY pnpm-workspace.yaml pnpm-lock.yaml .npmrc package.json ./
COPY apps/docs/package.json ./apps/docs/package.json
COPY packages/ui/package.json ./packages/ui/package.json
COPY packages/shared/package.json ./packages/shared/package.json
COPY packages/charts/package.json ./packages/charts/package.json
COPY packages/shaders/package.json ./packages/shaders/package.json
COPY packages/canvas/package.json ./packages/canvas/package.json
RUN pnpm install --frozen-lockfile

# Build
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/apps/docs/node_modules ./apps/docs/node_modules
COPY --from=deps /app/packages/ui/node_modules ./packages/ui/node_modules
COPY --from=deps /app/packages/shared/node_modules ./packages/shared/node_modules
COPY --from=deps /app/packages/charts/node_modules ./packages/charts/node_modules
COPY --from=deps /app/packages/shaders/node_modules ./packages/shaders/node_modules
COPY --from=deps /app/packages/canvas/node_modules ./packages/canvas/node_modules
COPY . .
RUN pnpm --filter @base/docs exec vite build

# Production
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 app

COPY --from=builder --chown=app:nodejs /app/apps/docs/.output ./

USER app

EXPOSE 3000

CMD ["node", "server/index.mjs"]
