## Prerequisites for frontend development

- Node.js - http://nodejs.org/
- Git - http://git-scm.com/

## Frontend

### With docker

Build the project outside docker with `npm run build`.
Build the container with

```
docker build -t tietokatalogi-frontend --build-arg PROXY_URL=< backend's url here, starting with http:// > .
```

..., where the backend's address is either http://localhost if running outside docker, or, if running with docker-compose, can be found with

```
docker network inspect tietokatalogi-backend_default
```

Run the container with

```
docker-compose up
```

When finished, run (from another terminal)

```
docker-compose down
```

### Without docker

TODO: how to change package.json -> proxy config? Currently it's configured to work inside the container only.

Install

```
npm install
```

Run

```
npm run start
```

To specify the url path for backend (other than the default tietokatalogi/rest)

```
export REACT_APP_BASE_REST_URL="<path>"
```

Build frontend

```
npm run build
```

### Testing

Tests are configured to work with Jest.
Run the tests with

```
npm run test
```
