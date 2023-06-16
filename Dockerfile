# build front-end
FROM node:lts-alpine AS frontend

WORKDIR /app

COPY /packages/text-correction-web/package.json /app

COPY /packages/text-correction-web/yarn.lock /app

RUN yarn install

COPY /packages/text-correction-web /app

RUN yarn run build

# run backend
FROM node:lts-alpine

WORKDIR /app

COPY /packages/text-correction-server/package.json /app

COPY /packages/text-correction-server/yarn.lock /app

RUN yarn install

COPY /packages/text-correction-server /app

COPY --from=frontend /app/dist /app/public

EXPOSE 3000

CMD ["yarn", "start"]
