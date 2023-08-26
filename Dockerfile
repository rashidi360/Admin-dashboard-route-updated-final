FROM node:18 as builder

WORKDIR "/Admin dashboard - route final updated"

ENV PATH="./node_modules/.bin:$PATH"

COPY package.json .

COPY package-lock.json .

RUN npm install

RUN npm run build

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
