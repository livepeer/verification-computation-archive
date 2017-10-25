FROM yondon/livepeer-ubuntu1604:latest
MAINTAINER Yondon Fu "yondon@livepeer.org"

WORKDIR /app/
COPY package.json /app/package.json
COPY index.js /app/index.js
COPY lib /app/lib
COPY setup.sh /app/setup.sh

RUN chmod 755 /app/setup.sh
RUN npm install --only=production

ENTRYPOINT ./setup.sh && node index.js $ARG0 $ARG1
