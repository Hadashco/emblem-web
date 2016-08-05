FROM node:6
MAINTAINER Hadeshco

RUN mkdir -p /usr/emblem-web /usr/emblem-web/server
WORKDIR /usr/emblem-web/server

COPY . .

RUN npm install -q \
    &&  npm install nodemon -g -q

EXPOSE 3000
