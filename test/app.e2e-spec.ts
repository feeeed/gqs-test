import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types.js';
import { AppModule } from './../src/app.module.js';
import { PrismaService } from './../src/prisma/prisma.service.js';

describe('AppModule (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const prismaMock = {
      profile: {
        findFirst: async () => ({
          id: 'profile-main',
          name: 'Alex Morgan',
          description: 'Software engineer focused on backend systems, API design, and developer experience.',
          createdAt: new Date('2023-01-01T00:00:00.000Z'),
          updatedAt: new Date('2024-03-02T00:00:00.000Z'),
        }),
      },
      socialLink: { findMany: async () => [{ id: 'link-1', platform: 'GitHub', url: 'https://github.com/your-handle', profileId: 'profile-main' }] },
      skill: { findMany: async () => [{ id: 'skill-1', name: 'TypeScript', category: 'Language', level: 'Expert', order: 1, profileId: 'profile-main' }] },
      experience: { findMany: async () => [{ id: 'exp-1', company: 'Northstar Studio', position: 'Senior Backend Engineer', period: 'Jan 2023 - Present', startDate: new Date('2023-01-01T00:00:00.000Z'), endDate: null, achievements: ['Built APIs'], profileId: 'profile-main' }] },
      project: { findMany: async () => [{ id: 'project-1', name: 'Digital Business Card API', description: 'GraphQL portfolio API', url: 'https://github.com/your-handle/digital-business-card', profileId: 'profile-main' }] },
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('returns the profile over GraphQL', async () => {
    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: 'query { profile { name description skills { name } experience { company position } projects { name } } }',
      })
      .expect(200);

    expect(response.body.data.profile).toMatchObject({
      name: 'Alex Morgan',
      description: 'Software engineer focused on backend systems, API design, and developer experience.',
      skills: [{ name: 'TypeScript' }],
      experience: [{ company: 'Northstar Studio', position: 'Senior Backend Engineer' }],
      projects: [{ name: 'Digital Business Card API' }],
    });
  });

  afterEach(async () => {
    await app.close();
  });
});
