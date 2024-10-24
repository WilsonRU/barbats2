# syntax = docker/dockerfile:1
FROM node:21-slim

ENV NODE_ENV="production"

WORKDIR /app

RUN apt-get update -qq && \
    apt-get install -y build-essential pkg-config python-is-python3 openssl

COPY package.json package-lock.json ./
RUN npm install
COPY . .

RUN npm run build
RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["npm", "run", "start"]
