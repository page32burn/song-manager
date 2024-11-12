FROM node:20-slim

WORKDIR /app

RUN apt-get update && apt-get install -y openssl

COPY package*.json ./

RUN npm install && \
    npm i -g @nestjs/cli@9.1.2

COPY . .

RUN npx prisma generate

CMD ["npm", "run", "start:dev"]

EXPOSE 5000