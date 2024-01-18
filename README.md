## Prerequisites for frontend development

- Node.js - http://nodejs.org/
- Git - http://git-scm.com/

## Frontend

## Node and npm versions

Node: 14.21.3
npm: 6.14.18

### With docker

Build the project outside docker with `npm run build`.

Build the container with

```shell
docker build -t tietokatalogi-frontend --build-arg PROXY_URL=http://{backend container's name} .
```

..., where the backend's address is either http://localhost if running outside docker, or, if running with docker-compose, can be found with

```shell
docker network inspect tietokatalogi-backend_default
```

Run the container with

```shell
docker-compose up
```

When finished, run (from another terminal)

```shell
docker-compose down
```

### Without docker

TODO: how to change package.json -> proxy config? Currently it's configured to work inside the container only.

Install

```shell
npm install
```

Run

```shell
npm start
```

To specify the url path for backend (other than the default tietokatalogi/rest)

```shell
export REACT_APP_BASE_REST_URL="<path>"
```

Build frontend

```shell
npm run build
```

### Testing

Tests are configured to work with Jest.
Run the tests with

```shell
npm run test
```
