# Development Environment

To prepare your local development environment, follow these steps.

## 📋 Prerequisites

You need to have the following software installed on your machine:

- [Java JDK 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [PostgreSQL 16](https://www.postgresql.org/download/)

## IntelliJ IDEA recommended plugins

Make sure you have the following plugins installed in IntelliJ IDEA:

- [Cucumber.js](https://plugins.jetbrains.com/plugin/7418-cucumber-js) for writing and running Cucumber tests
- [Biome](https://plugins.jetbrains.com/plugin/22761-biome) for linting and auto-formatting TypeScript code

## 🔧 Setup

### PostgreSQL Database

After cloning the repository, create a database:

```
psql -U postgres -f backend/create_db.sql
```

### Node.js and pnpm

The following installs Node.js and [pnpm](https://pnpm.io/pnpm-cli) locally to `frontend/node`
(using a [org.siouan.frontend](https://siouan.github.io/frontend-gradle-plugin/) Gradle plugin)
and Node.js dependencies to `frontend/node_modules`, including Playwright browsers:

```
cd backend
./gradlew installFrontend
```

Setup Node.js and pnpm in IntelliJ IDEA in **Settings > Languages & Frameworks > Node.js**:

| OS      | Settings                                                                                                               |
|---------|------------------------------------------------------------------------------------------------------------------------|
| Windows | Node interpreter: `<project dir>\frontend\node\node.exe` <br/> Package manager: `<project dir>\frontend\node\pnpm.cmd` |
| Linux   | Node interpreter: `<project dir>/frontend/node/bin/node` <br/> Package manager: `<project dir>/frontend/node/bin/pnpm` |

To run `node` or `pnpm` from the terminal, add it to your `PATH`:

| OS      | Command                                      |
|---------|----------------------------------------------|
| Windows | `$env:Path = $pwd\frontend\node + $env:Path` |
| Linux   | `export PATH=$PWD/frontend/node/bin:$PATH`   |
