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
* [__Standard__](https://standardjs.com/) - lint checker

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
* [__Priorities__](./models/Priority.js) - customer priorities

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

### Installation, Testing, Linting (see [Dockerfile](./dockerfile))
```
$ docker-compose build
```
```
$ docker-compose build --no-cache
```

### Development (see [docker-compose.yml](./docker-compose.yml))
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
* Debug Mode
* Testing
    * ~~Unit Testing~~
    * ~~API Testing~~
* Infrastructure
    * ~~Logging~~
    * ~~Standard Lint~~
    * Ready for monitoring
        * event reporting
        * event tracing through correlationId
        * Platform monitoring
            * see [Prometheous](https://prometheus.io/)
        * Application monitoring
    * ~~Error handling~~
    * ~~JWT API Security~~
    * API Permissions
    * Microservice Intercommunication
        * see [RabbitMQ](https://www.rabbitmq.com/)/[Kafka](https://kafka.apache.org/intro)
    * Distributed Rollback
        * See [Saga Pattern](https://microservices.io/patterns/data/saga.html)
* Documentation
    * ~~README.md~~
    * ~~API Documentation~~
    * [Sequence Interaction Diagram](./notes/business/QuotationWorkflow.md)
    * [High Level Tech Architecture Diagram](./notes/software/Architecture.md)
    * [Study DDD Approach](./notes/software/DDD)
