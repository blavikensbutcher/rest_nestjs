FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env ./

EXPOSE 3000

RUN npx prisma db push

RUN npx prisma generate


CMD ["npm", "run", "start:dev"]
