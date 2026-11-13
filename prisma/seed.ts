import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileId = 'profile-main';

const socialLinks = [
  {
    id: 'social-github',
    platform: 'GitHub',
    url: 'https://github.com/feeeed',
    profileId: profileId,
  },
  {
    id: 'social-telegram',
    platform: 'Telegram',
    url: 'https://t.me/GEEKCR',
    profileId: profileId,
  },
];

const skills = [
  { id: 'skill-typescript', name: 'TypeScript', category: 'Language', level: 'Expert', order: 1, profileId: profileId },
  { id: 'skill-nodejs', name: 'Node.js', category: 'Runtime', level: 'Expert', order: 2, profileId: profileId },
  { id: 'skill-nestjs', name: 'NestJS', category: 'Framework', level: 'Expert', order: 3, profileId: profileId },
  { id: 'skill-prisma', name: 'Prisma', category: 'Database', level: 'Advanced', order: 4, profileId: profileId },
  { id: 'skill-graphql', name: 'GraphQL', category: 'API', level: 'Advanced', order: 5, profileId: profileId },
  { id: 'skill-docker', name: 'Docker', category: 'DevOps', level: 'Advanced', order: 6, profileId: profileId },
  { id: 'skill-postgresql', name: 'PostgreSQL', category: 'Database', level: 'Advanced', order: 7, profileId: profileId },
  { id: 'skill-git', name: 'Git', category: 'Version Control', level: 'Expert', order: 8, profileId: profileId },
];

const experiences = [
  {
    id: 'exp-mid',
    company: 'B2B Эко-Тех (Проектная разработка)',
    position: 'Middle Fullstack Engineer',
    period: 'Nov 2025 - Present',
    startDate: new Date('2025-11-01T00:00:00.000Z'),
    endDate: null,
    achievements: [
      `Архитектура и Frontend: Спроектировал и реализовал клиентскую часть приложения на базе Next.js гибридный рендеринг SSR + CSR
      с использованием методологии Feature-Sliced Design FSD, что позволило изолировать бизнес-домены и упростить онбординг новых разработчиков
      Работа со сложными формами и данными: Разработал модуль многоступенчатых форм отчетности с валидацией на лету React Hook Form + Zod,
      внедрил умный поиск контрагентов по ИНН с дебаунсом и виртуализацией списков для работы с многоуровневыми
      государственными справочниками без просадок FPS`,
      `Backend и безопасность: Спроектировал реляционную схему БД (PostgreSQL + Drizzle ORM)
      для хранения версионности отчетов. Реализовал ролевую модель доступа (RBAC) и защиту маршрутов
      через Next.js Middleware и JWT (Access/Refresh токены в HttpOnly cookies).
      Оптимизация тяжелых вычислений: Разработал серверный модуль генерации и потоковой выгрузки (Streams)
      сложных аналитических отчетов в формат .xlsx через ExcelJS, 
      исключив блокировку Event Loop при выгрузке больших объемов данных.`,
    ],
    profileId: profileId,
  },
  {
    id: 'exp-mid1',
    company: 'Сибкомплект (Промышленный E-commerce & Продуктовый конфигуратор)',
    position: 'Middle Frontend Developer',
    period: 'Feb 2025 - Sep 2025',
    startDate: new Date('2025-02-01T00:00:00.000Z'),
    endDate: new Date('2025-09-30T00:00:00.000Z'),
    achievements: [
      `Разработка WebGL/3D-интерфейсов: Спроектировал архитектуру интерактивного 3D-каталога и конфигуратора промышленного оборудования на базе React Three Fiber с синхронизацией состояния 3D-сцены и классического React UI через стор (Zustand).`,
      `Масштабируемость и интеграция с CMS: Разработал универсальное ядро карточки товара, позволяющее контент-менеджерам загружать новые 3D-модели и настраивать точки обзора (камеры, хотспоты) напрямую из административной панели без участия разработчиков.`,
      `Глубокая оптимизация производительности: Внедрил сжатие геометрии (Draco) и текстур (KTX2/WebP), настроил ленивую подгрузку ассетов (Suspense) и пулинг объектов. Решил проблему утечек памяти (Memory Leaks) при размонтировании WebGL-контекста при переходах в Next.js, обеспечив стабильные 60 FPS даже на устройствах со встроенной графикой.`,
    ],
    profileId: profileId,
  },
  {
    id: 'exp-mid2',
    company: 'crmChat',
    position: 'Full-Stack Developer',
    period: 'Apr 2024 - Feb 2025',
    startDate: new Date('2024-04-01T00:00:00.000Z'),
    endDate: new Date('2025-02-28T00:00:00.000Z'),
    achievements: [
      `Разработка Real-time функционала: Разрабатывал клиентские модули чатов и аналитических дашбордов. Реализовал отказоустойчивый слой работы с WebSockets (автореконнект, очередь неотправленных сообщений в офлайне, оптимистичные обновления UI).`,
      `Оптимизация сборки и Web Vitals: Участвовал в переводе сборки проекта с легаси Webpack на Vite, что сократило время холодного старта дев-сервера с 40 до 3 секунд. `,
    ],
    profileId: profileId,
  },
];

const projects = [
  {
    id: 'cd-leader-b',
    name: 'CD Leader Backend',
    description: 'Cерверное приложение, построенное на базе NestJS для онлайн лидербордов',
    url: 'https://github.com/feeeed/cd-leader-b',
    profileId: profileId,
  },
];

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.profile.upsert({
      where: { id: profileId },
      update: {
        name: 'Makushin Egor',
        description: 'Software engineer focused on backend and frontend systems, API design, and developer experience.',
      },
      create: {
        id: profileId,
        name: 'Makushin Egor',
        description: 'Software engineer focused on backend and frontend systems, API design, and developer experience.',
      },
    });

    await tx.socialLink.deleteMany({ where: { profileId } });
    await tx.skill.deleteMany({ where: { profileId } });
    await tx.experience.deleteMany({ where: { profileId } });
    await tx.project.deleteMany({ where: { profileId } });

    await tx.socialLink.createMany({ data: socialLinks });
    await tx.skill.createMany({ data: skills });
    await tx.experience.createMany({ data: experiences });
    await tx.project.createMany({ data: projects });
  });

  console.log('Seed completed successfully.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
