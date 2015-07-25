FROM node:0.12

WORKDIR /app
ADD . /app

RUN ["npm", "install"]

EXPOSE 8080
