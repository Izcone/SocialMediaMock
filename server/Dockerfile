FROM node:12

WORKDIR /Desktop/SocialMediaApp/server

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm","start"]