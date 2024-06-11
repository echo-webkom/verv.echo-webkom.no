# verv.echo.uib.no

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [PNPM](https://pnpm.io/)
- [Turso CLI](https://docs.turso.tech/cli/introduction)

## Installation

```bash
pnpm install
```

## Development

Start the database server:

```bash
turso dev --db-file dev.db
```

Run the migrations:

```bash
pnpm db:migrate
```

Start the development server:

```bash
pnpm dev
```
