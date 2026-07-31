# Contributing to kousta-ui

Thanks for your interest in contributing! This is a Yarn workspaces monorepo managed with [Lerna](https://lerna.js.org/), containing a React component library, a data table package, hooks, helpers, and a Next.js docs site.

## Getting started

Requirements: Node 18+ and Yarn (this repo uses Yarn 4 via Corepack, `packageManager: yarn@4.5.0`).

```bash
git clone https://github.com/Oustaa/kousta-ui.git
cd kousta-ui
yarn install
```

This installs dependencies for every workspace (`packages/*`, `demos/*`, and `docs`).

## Repository layout

```
packages/
  components/  # @kousta-ui/components — React UI components
  table/       # @kousta-ui/table — data table component
  hooks/       # @kousta-ui/hooks — React hooks
  helpers/     # @kousta-ui/helpers — utility functions
  styles/      # shared styles
demos/         # example apps that consume the packages (components-demo, table-demo, cjs-demo)
docs/          # Next.js + Nextra documentation site (ui.kousta.org)
```

Each package under `packages/` has its own `package.json`, `rollup.config.mjs`, and `src/` directory, and builds independently through Lerna.

## Development workflow

### Tests

Tests are run with Jest from the repo root:

```bash
yarn test          # run the full test suite
yarn test:watch    # watch mode
```

### Linting and formatting

```bash
yarn lint    # eslint across package src files
yarn format  # prettier --write across packages/**/*.{ts,tsx,json,css,md}
```

Please run both before opening a PR. Commit messages are linted with commitlint (via a Husky `commit-msg` hook) — follow [Conventional Commits](https://www.conventionalcommits.org/) style (e.g. `fix(components): correct modal offset calculation`).

### Building packages

```bash
yarn build   # lerna run build — builds all packages
yarn clean   # lerna run clean — removes build output
```

### Storybook

Components are developed and previewed in Storybook:

```bash
yarn storybook   # starts Storybook on http://localhost:6006
```

### Demo apps

You can also exercise changes in one of the demo apps:

```bash
yarn components:demo   # runs demos/components-demo
yarn table:demo         # runs demos/table-demo
yarn demos              # runs both demos concurrently
```

### Docs site

The documentation site lives in `docs/` (Next.js + Nextra):

```bash
yarn docs:dev   # starts the docs site with hot reload
```

If you're changing MDX content, it lives under `docs/src/content/`.

## Submitting a pull request

1. Fork the repo and create a branch off `main`.
2. Make your changes in the relevant `packages/*` (or `docs/`) directory.
3. Run `yarn lint`, `yarn format`, and `yarn test` and make sure they pass.
4. Commit using a Conventional Commits message.
5. Open a pull request against `main` describing what changed and why.

There's no automated CI test/build pipeline in this repo yet — the only GitHub Actions workflow deploys the docs site on push to `main`. Reviewers will run tests and lint locally, so please make sure both pass before requesting review.
