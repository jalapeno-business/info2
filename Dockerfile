FROM node:8

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 1177

CMD [ "npm", "start" ]