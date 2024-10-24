# syntax = docker/dockerfile:1
FROM node:21-slim

WORKDIR /app

RUN npm install -g npm

RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 openssl

COPY package.json package-lock.json yarn.lock ./
RUN yarn --frozen-lockfile install
COPY . .

RUN yarn build

ENV NODE_ENV="production"

RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["npm", "run", "start"]
