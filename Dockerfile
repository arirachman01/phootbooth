# ==========================
# Build Stage
# ==========================
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./
COPY prisma ./

RUN npm ci
RUN npx prisma generate

COPY . .
RUN npm run build
RUN npm prune --omit=dev
# ==========================
# Production Stage
# ==========================
FROM gcr.io/distroless/nodejs22-debian12:nonroot

WORKDIR /app

# Copy production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

USER nonroot
EXPOSE 3000

CMD ["dist/src/main"]
