# Development

    npm run watch
    npm run test:watch

# Build

    npm run build

# Test

    npm run test
    npm run test:watch

# Lint

    npm run lint
    npm run lint:fix

# Bump version

    npm run version:patch
    npm run version:minor
    npm run version:major

# Bump version and Release (github and NPM)

On `master` branch only!
Bump version and push to Github.
Github Actions builds, runs tests and publishes on NPM.

  npm run release
  npm run release:patch
  npm run release:minor
  npm run release:major
