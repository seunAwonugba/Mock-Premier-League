# Mock Premier League - README

## Description

This application is a solution for the Mock Premier League API. It provides APIs for managing users, teams, fixtures, and admin functionalities, with Redis for session management and PostgreSQL for data storage.

## Prerequisites

Ensure you have the following installed:

-   [Node.js](https://nodejs.org/) (v18 or higher)
-   [Docker](https://www.docker.com/)
-   [PostgreSQL](https://www.postgresql.org/) (Alternatively, use Docker for PostgreSQL)
-   [Redis](https://redis.io/) (Alternatively, use Docker for Redis)

## Local Development Setup

### Step 1: Clone the repository

```bash
  git clone https://github.com/seunAwonugba/Mock-Premier-League.git
```

cd Mock-Premier-League

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Setup environment variables

```bash
PORT=
HOST=
DB_HOST_DEV=
DB_HOST_TEST=
DB_HOST_PROD=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DEV_DB=
TEST_DB=
PROD_DB=
DB_DIALECT=
REDIS_PORT=
REDIS_URL=
SESSION_SECRET=
SESSION_NAME=
BCRYPTJS_SALT=
ADMIN_ACCESS_TOKEN_KEY=
ADMIN_REFRESH_TOKEN_KEY=
USER_ACCESS_TOKEN_KEY=
USER_REFRESH_TOKEN_KEY=
ACCESS_TOKEN_EX=
REFRESH_TOKEN_EX=
BASE_URL=
```

Replace env values with your desired values.

### Step 4: Run database migrations and seed

```bash
npm run db:fresh:seed
```

### Server running...

When you see

Executing (default): SELECT 1+1 AS result

⚡️[database]: Database connection has been established successfully.

⚡️[redis]: Redis connection has been established successfully.

⚡️[server]: Server is running at http://{HOST}:{PORT}

It means server is up and running

## Docker Setup

```bash
docker-compose up --build
```

## Running Tests

```bash
npm test
```

## Postman Documentation

```bash
https://documenter.getpostman.com/view/17083552/2sAXqzYeaa
```
