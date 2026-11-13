# Digital Business Card API

Готовый к эксплуатации бэкенд на базе NestJS и GraphQL, предназначенный для профиля инженера-программиста. Приложение предоставляет GraphQL-схему с запросом `profile`, содержит предварительно загруженные данные резюме, использует Prisma для работы с базой данных, а также включает настроенный процесс запуска в Docker с использованием PostgreSQL.

## Architecture & Design Decisions

This application is built with a focus on modern best practices, maintainability, and enterprise-grade architecture:

Данное приложение разработано с учетом современных передовых практик, принципов удобства сопровождения и архитектуры корпоративного уровня:

1. Модульная архитектура NestJS:
- Приложение разделено на изолированные функциональные и инфраструктурные домены (например, ProfileModule, PrismaModule). 
- Это обеспечивает четкое разделение ответственности, упрощает модульное тестирование и позволяет масштабировать отдельные части системы.

2. Подход «Code-First» для GraphQL:
- Используются классы TypeScript и декораторы NestJS (@ObjectType(), @Field(), @Query(), @ResolveField()) — см. src/profile/models/ и src/profile/profile.resolver.ts. 
- GraphQL-схема генерируется автоматически и включает подробные описания (description), что делает её самодокументируемой (доступно через **Apollo Sandbox**).

3. Prisma ORM и PostgreSQL с защитой от проблемы N+1:
- PrismaService управляет жизненным циклом подключения к базе данных (хуки OnModuleInit, OnModuleDestroy). 
- Связанные данные (skills, experience, projects, links) загружаются по мере необходимости (lazy loading) или через явное указание в Prisma, а также с помощью декоратора @ResolveField() в NestJS. Это предотвращает выполнение избыточных запросов и гарантирует предсказуемый порядок вывода данных (например, сортировка навыков по возрастанию, а опыта работы — в обратном хронологическом порядке).

4. Идемпотентное наполнение данными (seeding) и Docker без дополнительной настройки:
- В файле prisma/seed.ts используется безопасный метод upsert и транзакционная очистка данных, что исключает ошибки при перезапуске контейнера (например, из-за дублирования первичных ключей). 
- Многоэтапный (multi-stage) Dockerfile в сочетании со скриптом docker-entrypoint.sh автоматизирует выполнение миграций базы данных и её наполнение при запуске контейнера.

## Stack

- Node.js 20
- NestJS 12
- TypeScript
- GraphQL with Apollo (`@nestjs/graphql`, `@apollo/server`)
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

