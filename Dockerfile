FROM node:22.14.0-alpine3.21

RUN apk update && apk add --no-cache curl

RUN npm install -g npm@11.4.1

USER node

WORKDIR /home/node/api

COPY --chown=node:node src/infra/scripts/ src/infra/scripts/

COPY --chown=node:node package*.json .

RUN npm install --omit=dev

COPY --chown=node:node . .

CMD ["npm", "start"]
