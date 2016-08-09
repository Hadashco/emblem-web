FROM node:6
MAINTAINER Hadeshco

RUN mkdir -p /usr/emblem-web /usr/emblem-web/server
WORKDIR /usr/emblem-web

COPY . .
WORKDIR /usr/emblem-web/server

RUN npm install nodemon -g -q \
    && npm install mocha -g -q \
    && npm install webpack -g -q \
    && npm run build

RUN npm config set bin-links false

EXPOSE 3000
