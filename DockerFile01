FROM node:latest as build-stage

WORKDIR /app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn run build

# production stage
FROM node:latest as production-stage

COPY --from=build-stage /app/dist /app
COPY --from=build-stage /app/package.json /app/package.json

WORKDIR /app

RUN yarn install --production

EXPOSE 3005

CMD ["node", "/app/main.js"]
