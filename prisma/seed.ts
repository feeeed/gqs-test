import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const profileId = 'profile-main';

const socialLinks = [
  {
    id: 'social-github',
    platform: 'GitHub',
    url: 'https://github.com/your-handle',
    profileId: profileId,
  },
  {
    id: 'social-linkedin',
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/your-handle',
    profileId: profileId,
  },
  {
    id: 'social-telegram',
    platform: 'Telegram',
    url: 'https://t.me/your_handle',
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
    id: 'exp-senior',
    company: 'Northstar Studio',
    position: 'Senior Backend Engineer',
    period: 'Jan 2023 - Present',
    startDate: new Date('2023-01-01T00:00:00.000Z'),
    endDate: null,
    achievements: [
      'Designed and maintained high-load APIs for SaaS clients.',
      'Reduced database query latency by optimizing Prisma access patterns.',
      'Led architecture decisions for event-driven integrations.',
    ],
    profileId: profileId,
  },
  {
    id: 'exp-mid',
    company: 'Pixel Forge',
    position: 'Backend Engineer',
    period: 'Jun 2020 - Dec 2022',
    startDate: new Date('2020-06-01T00:00:00.000Z'),
    endDate: new Date('2022-12-31T00:00:00.000Z'),
    achievements: [
      'Built microservice integrations with GraphQL and PostgreSQL.',
      'Improved deployment reliability through CI/CD automation.',
      'Mentored junior engineers and reviewed pull requests.',
    ],
    profileId: profileId,
  },
  {
    id: 'exp-junior',
    company: 'Code Canvas',
    position: 'Full-Stack Developer',
    period: 'Sep 2018 - May 2020',
    startDate: new Date('2018-09-01T00:00:00.000Z'),
    endDate: new Date('2020-05-31T00:00:00.000Z'),
    achievements: [
      'Delivered internal admin panels and API features.',
      'Implemented clean frontend-backend contracts using REST and GraphQL.',
      'Improved onboarding with documentation and reusable components.',
    ],
    profileId: profileId,
  },
];

const projects = [
  {
    id: 'project-bc',
    name: 'Digital Business Card API',
    description: 'A production-ready GraphQL API for a developer profile, portfolio, and resume data.',
    url: 'https://github.com/your-handle/digital-business-card',
    profileId: profileId,
  },
  {
    id: 'project-analytics',
    name: 'Analytics Platform',
    description: 'A reporting and monitoring system for product and operational KPIs.',
    url: 'https://github.com/your-handle/analytics-platform',
    profileId: profileId,
  },
  {
    id: 'project-automation',
    name: 'Workflow Automation',
    description: 'Developer tooling automating deployment, release, and maintenance processes.',
    url: 'https://github.com/your-handle/workflow-automation',
    profileId: profileId,
  },
];

async function main() {
  await prisma.$transaction(async (tx) => {
    await tx.profile.upsert({
      where: { id: profileId },
      update: {
        name: 'Alex Morgan',
        description: 'Software engineer focused on backend systems, API design, and developer experience.',
      },
      create: {
        id: profileId,
        name: 'Alex Morgan',
        description: 'Software engineer focused on backend systems, API design, and developer experience.',
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
