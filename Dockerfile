FROM node:lts as base
LABEL authors="teernisse"

WORKDIR /home/node/app
ARG COMMIT_ID
ENV COMMIT_ID=${COMMIT_ID}

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

FROM base as production

ENV NODE_PATH=./dist

RUN npm run build

#RUN npm ci
#ENV NODE_ENV production
#RUN npm run build
#EXPOSE 3000
#
#CMD ["node", "dist/app.js"]