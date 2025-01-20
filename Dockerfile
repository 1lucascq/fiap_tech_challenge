FROM node:18.20.5-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]