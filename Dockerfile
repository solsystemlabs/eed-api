FROM node:lts as base
LABEL authors="teernisse"

WORKDIR /home/node/app
ARG COMMIT_ID
ENV COMMIT_ID=${COMMIT_ID}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build
