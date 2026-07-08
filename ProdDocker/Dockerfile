# ============================================================
# Stage 1: Dependencies - キャッシュ効率を最大化
# ============================================================
FROM node:24-alpine AS deps

WORKDIR /app

# package.json と package-lock.json のみコピーしてキャッシュを活用
COPY app/package.json app/package-lock.json ./

RUN npm ci

# ============================================================
# Stage 2: Build - Next.js アプリケーションをビルド
# ============================================================
FROM node:24-alpine AS builder

WORKDIR /app

# deps ステージから node_modules をコピー
COPY --from=deps /app/node_modules ./node_modules
COPY app/ .

# standalone モードでビルド
RUN npm run build

# ============================================================
# Stage 3: Runner - 最小限の本番イメージ
# ============================================================
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# standalone 出力をコピー
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]
