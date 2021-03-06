FROM node:12-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install --silent
RUN npm install react-scripts --silent

COPY . /usr/src/app

CMD ["npm", "run", "start"]
EXPOSE 3000
