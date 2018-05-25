FROM node:8

RUN mkdir /app
WORKDIR /app
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json

ARG NODE_ENV=production
RUN npm install

COPY . /app

ENV PORT 8080

CMD [ "npm", "start" ]
