# Customer Mircoservice

This microservice will serve as a customer information provider.

## Tech
* [__Node.js__](https://nodejs.org/en/)
* [__ES6__]() - ECMAScript 6 syntax
* [__Express.js__](https://expressjs.com/) - api web framework for node.js
* [__JWT__](https://jwt.io) - token based security, creates and validates tokens
* [__Mongoose__](http://mongoosejs.com/) - mongodb object modeling
* [__MongoDb__](https://www.mongodb.com/) - noSQL for database
* [__Winston__](https://www.npmjs.com/package/winston) - node console and file logger

## Testing
* [__Mocha__](https://mochajs.org/) - test framework running on node.js
* [__Chai__](https://www.chaijs.com/) - assertion library for node.js
* [__Supertest__](https://www.npmjs.com/package/supertest) - http testing
* [__Sinon__](https://sinonjs.org/) - test spies, stubs and mocks

## API Documentation
See customer API documentation [here](./documentation/output/customer.html).

## Database
Mongodb Collections

* [__Customer__](./models/Customer.js) - basic customer information

## Local Development
### Prerequisite
* [__Node.js__](https://nodejs.org/en/)

### Installation
```
$ npm install
```

### Development
```
$ npm run watch
```

### Testing
```
$ npm test
```

### Linting
```
$ npm run lint
```

## Docker Development
### Prerequisite
* [__Docker__](https://www.docker.com/)
* [__Docker Compose__](https://docs.docker.com/compose/)

### Installation, Testing, Linting (see Dockerfile)
```
$ docker-compose build
```
```
$ docker-compose build --no-cache
```

### Development (see docker-compose.yml)
```
$ docker-compose up
```
```
$ docker-compose up --detach
```

### Deploy to docker swarm
```
docker swarm init
docker-compose up --detach
docker stack deploy --compose-file docker-compose.yml app
```

## TODOs
* Rest API Express.js
    * ~~CRU~~
    * ~~Expressjs Validation~~
    * Get all search, sort, paginate
* MongoDB
    * Database Security
* Docker
    * ~~Dockerized App and Database~~
    * ~~Try Docker Swarm~~
    * ~~CI/CD~~
        * ~~CicleCI Build:DockerHub Deploy:Docker Swarm~~
* Testing
    * Controller Unit Testing
    * ~~API Testing~~
* Infrastructure
    * ~~Logging~~
    * ~~Standard Lint~~
    * Ready for monitoring service
    * CorrelationId
    * ~~Error handling~~
    * ~~JWT API Security~~
    * API Permissions
* Documentation
    * ~~README.md~~
    * ~~API Documentation~~
    * Sequence Interaction Diagram
    * High Level Tech Architecture
    * Study DDD Approach
