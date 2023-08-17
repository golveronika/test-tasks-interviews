FROM node

WORKDIR /app

COPY package.json /app/

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["node", "app.js"]
