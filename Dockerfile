FROM node:6
MAINTAINER Hadeshco

RUN mkdir -p /usr/emblem-web
WORKDIR /usr/emblem-web

COPY . .

RUN npm install nodemon -g -q \
    && npm install mocha -g -q \
    && npm install webpack -g -q \
    && npm install

RUN npm config set bin-links false

EXPOSE 3000
