FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

RUN npx prisma generate


CMD ["npm", "run", "start:dev"]
