FROM node:16-bullseye

WORKDIR /app-node

COPY . .

RUN npm install 

EXPOSE 9000

CMD ["npm", "start"]