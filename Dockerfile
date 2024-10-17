FROM node:20-alpine

WORKDIR /code

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

RUN npm install

COPY . /code

RUN npm run compile

EXPOSE 3000

CMD ["npm", "run", "dev-docker"]