FROM node:16-buster

WORKDIR /app

COPY . .

RUN npm install --prod

EXPOSE 3000

CMD ["node", "src/app.js"]