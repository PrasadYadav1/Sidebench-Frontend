# Moony Admin Frontend

  

Welcome to Moony

  

## Table of Contents -

  

- [Project Structure](#project-structure)

- [Install](#install)

- [Environment Variables](#environment-variables)

- [Axios](#axios-usage)

- [Usage](#usage)

- [Run In Development Mode](#start-local-development)

- [Build](#build)

- [Run In Production Mode](#run-in-production-mode)

- [Run Lint](#run-lint)

- [Run Tests](#run-tests)

- [Git Workflows](#git-workflows)

- [Best Practices](#best-practices)
  

## Project Structure

  
### Top-level directory layout
  
.

├── build # Compiled files

├── public # Public files like images goes here

├── src # Source files

├── src/config # App related config files goes here

├── src/components # All pure components goes here , it will be free from side effects like api calls, react context, redux ... etc

├── src/containers  # Contains all side effects like api calls, react context, redux etc ... goes here

├── src/utils # All utility functions goes here

├── _test_ # Unit tests or integration tests (alternatively `spec` or `tests`)

├── .gitignore

├── .eslintrc.json # Eslint settings and rules defined here

├── .prettierrc.json # Prettier settings defined here

├── package.json

└── tsconfig.json # Typescript configuration

├── LICENSE

└── README.md

## Install

  

This project uses react and yarn. Go check them out if you don't have them locally installed.
Dont mix yarn and npm

```bash
npm install -g npx yarn

```

Go to the project root folder and run following command

```bash
 yarn     
```

## Environment variables
App needs following environment variables
 - REACT_APP_API_URL : #url for the api
 - REACT_APP_SESSION_ALERT_TIME_OUT: # timeout(in milliseconds) to show session inactivity popup to user, default is 15 mins
 - REACT_APP_PROMPT_TIME_OUT: # timeout(in milliseconds) to close inactivity popup and log out session if user not perform any action, default is 1 minute. 

## Axios
There are two instances of axios as follows in (../utils/axios.ts)
  - **axiosInstance**: This is a normal axios instance which is not configured with any interceptors.
You have to pass token if authorization needed. Use it for calling 3rd party apis or public apis.
  - **axiosInstanceWithAuth**: This is axios instance whose request is intercepted to take token from
local storage and user doesn't need to pass token explicitly. This is also configured for the auto refresh token if instance api call throws 401 error , it will trigger refresh-token api call automatically.**Recommended usage only for this project api calls which need authentication token**

## Usage

  

This section describes all the available scripts that the contributors can use during the development.

  

### Start Local Development

  

```bash
yarn run start

```


### Build

  

Use following command to build and generate build files.

  

```bash

yarn run build

```

  
  

### Run In Production Mode

  

After [build](#Build) run following command.

  

```bash

yarn run start

```

## Git Workflows : 

The merge flow is dev -> staging -> uat -> prod.
When we need to deploy to staging, a PR from dev -> staging will be created, reviewed, and merged.
Merging into staging will kick off a staging build similarly.

Similar for merging into uat and prod.


### Run Lint

  Use following command to check lint errors.

  

```bash

  yarn run lint

```

  

### Run Tests

  

Use following command to run tests with coverage details.

  

```bash

yarn run test

```
Use following command to run tests whenever a test is changed without restarting tests again.

  

```bash

yarn run test:watch

``` 

## Best Practices

  

- Don't import directly from files , import using index.ts.

do:

  

```typescript

import {DashboardComponent} from  '../components'

```

  

don't do:

  

```typescript

import {DashboardComponent} from  '../components/Dashboard'

```

  

- Before commit if there are any changes in code `run test` and `run lint`, so that can avoid unnecessary commit history.