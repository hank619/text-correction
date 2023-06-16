# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY ./text-correction-web/package.json /app

COPY ./text-correction-web/yarn.lock /app

RUN yarn install

COPY ./text-correction-web /app

RUN yarn run build

# run backend
FROM node:lts-alpine

WORKDIR /app

COPY ./text-correction-server/package.json /app

COPY ./text-correction-server/yarn.lock /app

RUN yarn install

COPY ./text-correction-server /app

COPY --from=frontend /app/dist /app/public

EXPOSE 3000

CMD ["yarn", "start"]
