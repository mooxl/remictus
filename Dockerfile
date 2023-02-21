
FROM node:lts-alpine as base
WORKDIR /base
COPY ./package.json ./package.json
RUN yarn install
COPY ./ ./

FROM base AS dev
ENV NODE_ENV=development
EXPOSE 3000
CMD ["yarn","remix","dev"]

FROM base AS build
ENV NODE_ENV=production
WORKDIR /build
COPY --from=base /base ./
RUN yarn build

FROM build AS prod
WORKDIR /app
COPY --from=build /app/build /app/build
COPY --from=build /app/public /app/public
CMD ["yarn","remix-serve","build"]