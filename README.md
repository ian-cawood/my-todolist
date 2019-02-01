# Todo list exercise

### Dependencies
> [Node](https://nodejs.org/en/)
> [Docker](https://docs.docker.com/install/)

For this project to run properly you will need docker and docker-compose running on your environment. The specific install path depends on your environment.

### Starting the app

#### With docker compose
This will start build the docker image if needed and start the container.
`docker-compose up` or
`npm run start:docker`

#### Without docker compose
This will install and start the server on local.
`npm i && npm run start`

Open the app with http://localhost:8080.

### Debugging
When the app is started in docker it will refresh on updates using nodemon and output can be seen in the container.

### Tests
Tests are integrated into the app and can be run in the container or outside(given you have node installed).

#### In docker container
Single run
`docker-compose exec node npm run test`
Watch mode
`docker-compose exec node npm run test:watch`

#### In local
Single run
`npm run test`
Watch mode
`npm run test:watch`
With coverage
`npm run test:coverage`

### Tests
s
### High level application requirements
1. Multiple users should be able to view the shared public todo list
2. Should be able to add items
3. Should be able to delete items
4. Should be able to edit items (Missing feature)
5. Must be able to deploy in docker (Missing feature)

### Tasks
1. Add missing requirement #4 to the application
2. Add sufficient test coverage to the application and update readme on howto run the tests
3. Add missing requirement #5 to the application (Dockerfile and update readme with instructions)

### Bonus
4. Display test coverage after tests are executed
5. Find and fix the XSS vulnerability in the application. Also make sure that it wont happen again by including a test.

> ### Notes
> - Update the code as needed and document what you have done in the readme below
> - Will be nice if you can git tag the tasks by number