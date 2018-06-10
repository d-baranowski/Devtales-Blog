FROM node:6

RUN npm install path
RUN npm install express
RUN npm install express-http-proxy
COPY config/apiProxy.js /app/config/
COPY scripts/start-prod.js /app/scripts/
COPY build/ /app/build


CMD node app/scripts/start-prod.js
EXPOSE 3000