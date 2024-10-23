# syntax = docker/dockerfile:1

FROM node:21-alpine

WORKDIR /app

ENV NODE_ENV="production"

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npx prisma generate
RUN npx prisma migrate deploy

EXPOSE 3000
CMD ["npm", "run", "start"]
