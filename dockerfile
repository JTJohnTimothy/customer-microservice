FROM node:10.15.3

WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

# Standard Lint
RUN node_modules/.bin/standard

# Unit Test
RUN npm test

EXPOSE 3000

CMD npm start