FROM node:19.8.1

ENV NODE_ENV production

WORKDIR /build

COPY package.json ./package.json
COPY tsconfig.json ./tsconfig.json

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]