#!/bin/bash

cd ./frontend
echo "Formatting FE..."
pnpm format
pnpm lint:fix

echo "Running E2E tests..."
cd ../backend
./gradlew testE2E
