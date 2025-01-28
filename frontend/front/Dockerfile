FROM node:23-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5174

ENTRYPOINT ["npm", "run", "dev", "--", "--port=5174", "--host=0.0.0.0"]