# Quizmaster

A quiz taking app as a case study for learning agile software development practices.

# Development Environment

To prepare your development environment, follow these steps.

## 📋 Prerequisites

You need to have the following software installed on your machine:

- [Java JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [PostgreSQL 16](https://www.postgresql.org/download/)

## 🔧 Setup

### PostgreSQL Database

After cloning the repository, create a database:

```
psql -U postgres -f backend/create_db.sql
```

### Node.js and pnpm

The following installs Node.js and [pnpm](https://pnpm.io/pnpm-cli) locally to `frontend/node`
(using a [org.siouan.frontend](https://siouan.github.io/frontend-gradle-plugin/) Gradle plugin)

```
cd backend
./gradlew installNode
./gradlew installPackageManager
```

Setup Node.js and pnpm in IntelliJ IDEA in **Settings > Languages & Frameworks > Node.js**:

- Node interpreter: `<project dir>/frontend/node/node`
- Package manager: `<project dir>/frontend/node/pnpm`

To run `node` or `pnpm` from the terminal, add it to your `PATH`:

| OS      | Command                                      |
|---------|----------------------------------------------|
| Windows | `$env:Path = $pwd\frontend\node + $env:Path` |
| Linux   | `export PATH=$PWD/frontend/node:$PATH`       |

### Install Node.js Dependencies

```
cd frontend
pnpm install
```

## 🚀 Running the Application

### Build the frontend

To build the front end, run either of the following commands (they do the same thing, the former runs the latter):

- `./gradlew assembleFrontend` in the `backend` directory
- `pnpm run build` in the `frontend` directory

The front end is built to the `backend/src/main/resources/static` directory
and becomes part of the JAR assembly.

### Run the backend

To run the application, in the `backend` directory execute:

```
./gradlew bootRun`
```

This command does not build the front end, so you need to run `assembleFrontend` or `pnpm run build` first.

## <img src="https://vitejs.dev/logo.svg" height="24"> Running Vite Development Server

To avoid rebuilding frontend and backend every time you make a change, you can run the [Vite](https://vitejs.dev/guide/)
development server  in the `frontend` directory:

```
pnpm vite
```

Vite starts a development server on `http://localhost:5173` and proxies requests to the backend server
on `http://localhost:8080`.

It watches for changes in the `frontend` directory and reloads the browser automatically with HMR.

## 🧪 Running end-to-end tests

You can run the end-to-end [Cucumber](https://cucumber.io/docs/guides/) + [Playwright](https://playwright.dev/) tests

- `pnpm run test:e2e` against the running app on `http://localhost:8080` (requires building the frontend first)
- `pnpm run test:e2e:vite` against the Vite development server on `http://localhost:5173`
