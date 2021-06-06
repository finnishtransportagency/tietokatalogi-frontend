## Prerequisites for frontend development

* Node.js - http://nodejs.org/
* Git - http://git-scm.com/

## Frontend
The frontend project is located in `src/main/app`. Run the following commands inside that directory.

Install
```
cd src/main/app
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

NOTE: Build frontend every time before maven build when frontend-project has changed.

### Testing
Tests are configured to work with Jest.
Run the tests with
```
npm run test
```