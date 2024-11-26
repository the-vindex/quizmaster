# Quizmaster

A quiz taking app that serves as a case study during
[Applying Professional Scrum for Software Development](https://scrumdojo.cz/aps-sd)
training with [ScrumDojo.cz](https://scrumdojo.cz).

## Tech Stack

Prior to the class ge yourself familiar with the tech stack:

- [Spring Boot](https://spring.io/projects/spring-boot)
- [Gradle](https://gradle.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Flyway](https://flywaydb.org/)
- [Solid.js](https://solidjs.com/)
- [Vite](https://vitejs.dev/)
- [Cucumber.js](https://cucumber.io/docs/guides/)
- [Playwright](https://playwright.dev/)

# 🖥️ Development Environment
You have two options to prepare your development environment:

1. **Docker/Podman container** \
Run a prepared self-contained development environment it in a Docker/Podman container. Go to
[scrumdojo/quizmaster-devcontainer](https://github.com/scrumdojo/quizmaster-devcontainer) and follow the instructions.

2. **Local environment** \
Install it on your [local machine](docs/dev-environment.md). You need only Java 21 JDK and PostgreSQL 16,
the rest (Gradle, pnpm, Node.js and Playwright) gets downloaded automatically.

# 🚀 Running the Application

## Build the frontend

To build the front end, run either of the following commands (they do the same thing, the former runs the latter):

- `./gradlew assembleFrontend` in the `backend` directory
- `pnpm run build` in the `frontend` directory

The front end is built to the `backend/src/main/resources/static` directory
and becomes part of the JAR assembly.

## Run the backend

To run the application, in the `backend` directory execute:

```
./gradlew bootRun`
```

This command does not build the front end, so you need to run `assembleFrontend` or `pnpm run build` first.

# <img src="https://vitejs.dev/logo.svg" height="24"> Running Vite Development Server

To avoid rebuilding frontend and backend every time you make a change, you can run the [Vite](https://vitejs.dev/guide/)
development server in the `frontend` directory:

```
pnpm vite --host
```

Vite starts a development server on `http://localhost:5173` and proxies requests to the backend server
on `http://localhost:8080`. "--host" is required so that it's accessible outside of container.

It watches for changes in the `frontend` directory and reloads the browser automatically with HMR.

# 🧪 Running end-to-end tests

You can run the end-to-end [Cucumber](https://cucumber.io/docs/guides/) + [Playwright](https://playwright.dev/) tests

- `pnpm run test:e2e` against the running app on `http://localhost:8080` (requires building the frontend first)
- `pnpm run test:e2e:vite` against the Vite development server on `http://localhost:5173`

# 🚩 Feature Flag

You can hide an unfinished feature behind a feature flag.

- on the frontend, the feature flag is a constant `FEATURE_FLAG_ENABLED`
- on the backend, the feature flag is a static method `FeatureFlag.isEnabled()`

To enable the feature flag, set the `FEATURE_FLAG` environment variable to `true` and rebuild both the frontend and
the backend:

| OS      | Command                    |
|---------|----------------------------|
| Windows | `$env:FEATURE_FLAG="true"` |
| Linux   | `export FEATURE_FLAG=true` |
