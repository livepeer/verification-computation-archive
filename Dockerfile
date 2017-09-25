FROM mhart/alpine-node:8
MAINTAINER Yondon Fu "yondon@livepeer.org"

WORKDIR /app/
COPY . /app/

RUN apk --no-cache add bash git
RUN npm install

ENTRYPOINT bash setup.sh && node index.js $ARG0 $ARG1