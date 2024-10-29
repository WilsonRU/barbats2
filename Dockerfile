# Stage 1: Build
FROM node:21-slim as builder

WORKDIR /app
RUN npm install -g npm
RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 openssl
COPY package.json package-lock.json yarn.lock ./
RUN yarn --frozen-lockfile install
COPY . .
RUN yarn build

# Stage 2: Runtime
FROM node:21-slim

ENV NODE_ENV="production"

WORKDIR /app
COPY --from=builder /app .
RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["npm", "run", "start"]
