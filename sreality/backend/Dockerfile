FROM node:19.8.1

WORKDIR /dist

COPY package.json ./
COPY tsconfig.json ./

COPY . .

RUN yarn install
RUN yarn build

EXPOSE 8080

CMD ["yarn", "start"]
