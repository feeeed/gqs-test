# Digital Business Card API

A production-ready NestJS + GraphQL backend for a software engineer profile. The application exposes a GraphQL schema with a `profile` query, seeded resume data, Prisma-powered persistence, and a Dockerized startup workflow with PostgreSQL.

## Stack

- Node.js 20
- NestJS 12
- TypeScript
- GraphQL with Apollo
- Prisma ORM
- PostgreSQL 16
- Docker / Docker Compose

## Quickstart

### With Docker (recommended)

```bash
docker compose up --build
```

Then open:
- Apollo Sandbox: http://localhost:3000/graphql
- PostgreSQL: localhost:5432

### Local development

```bash
pnpm install
pnpm prisma generate
pnpm run start:dev
```

The app reads `DATABASE_URL` from `.env`; make sure your PostgreSQL instance is running and accessible.

## GraphQL example

```graphql
query {
  profile {
    name
    description
    skills {
      name
      category
      level
    }
    experience {
      company
      position
      period
      achievements
    }
    projects {
      name
      description
      url
    }
  }
}
```

## Seed data

The project includes a Prisma seed that creates:
- 1 profile
- 3 social links
- 8 skills
- 3 experience entries
- 3 projects

Run it manually with:

```bash
pnpm prisma db seed
```

## Scripts

```bash
pnpm test
pnpm run test:e2e
pnpm run lint
pnpm run build
```

## Docker runtime behavior

The container starts with a `docker-entrypoint.sh` script that runs:
1. `npx prisma migrate deploy`
2. `npx prisma db seed`
3. `node dist/main.js`

This ensures the database is migrated and seeded automatically on container startup.

## Notes

This project intentionally uses a stable Prisma toolchain compatible with the repository schema and current NestJS setup.
