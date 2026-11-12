import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { PrismaService } from '../prisma/prisma.service.js';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  let service: ProfileService;
  const prisma = {
    profile: { findFirst: vi.fn() },
    socialLink: { findMany: vi.fn() },
    skill: { findMany: vi.fn() },
    experience: { findMany: vi.fn() },
    project: { findMany: vi.fn() },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileService,
        {
          provide: PrismaService,
          useValue: prisma,
        },
      ],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
    vi.clearAllMocks();
  });

  it('returns the primary profile when it exists', async () => {
    const profile = {
      id: 'profile-main',
      name: 'Alex Morgan',
      description: 'Backend engineer',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    };
    prisma.profile.findFirst.mockResolvedValue(profile);

    await expect(service.getProfile()).resolves.toEqual(profile);
    expect(prisma.profile.findFirst).toHaveBeenCalledWith({ orderBy: { createdAt: 'asc' } });
  });

  it('throws when no profile exists', async () => {
    prisma.profile.findFirst.mockResolvedValue(null);

    await expect(service.getProfile()).rejects.toThrow(NotFoundException);
  });

  it('returns links in deterministic order', async () => {
    const links = [{ id: 'link-1', platform: 'GitHub', url: 'https://github.com/test', profileId: 'profile-main' }];
    prisma.socialLink.findMany.mockResolvedValue(links);

    await expect(service.getLinks('profile-main')).resolves.toEqual(links);
    expect(prisma.socialLink.findMany).toHaveBeenCalledWith({ where: { profileId: 'profile-main' }, orderBy: { platform: 'asc' } });
  });

  it('returns skills in deterministic order', async () => {
    const skills = [{ id: 'skill-1', name: 'TypeScript', category: 'Language', level: 'Expert', order: 1, profileId: 'profile-main' }];
    prisma.skill.findMany.mockResolvedValue(skills);

    await expect(service.getSkills('profile-main')).resolves.toEqual(skills);
    expect(prisma.skill.findMany).toHaveBeenCalledWith({ where: { profileId: 'profile-main' }, orderBy: [{ order: 'asc' }, { name: 'asc' }] });
  });

  it('returns experience in reverse chronological order', async () => {
    const experiences = [{ id: 'exp-1', company: 'Northstar', position: 'Engineer', period: '2023', startDate: new Date('2023-01-01'), endDate: null, achievements: ['Built apps'], profileId: 'profile-main' }];
    prisma.experience.findMany.mockResolvedValue(experiences);

    await expect(service.getExperience('profile-main')).resolves.toEqual(experiences);
    expect(prisma.experience.findMany).toHaveBeenCalledWith({ where: { profileId: 'profile-main' }, orderBy: [{ startDate: 'desc' }, { company: 'asc' }] });
  });

  it('returns projects sorted by name', async () => {
    const projects = [{ id: 'project-1', name: 'Alpha', description: 'Demo', url: 'https://example.com', profileId: 'profile-main' }];
    prisma.project.findMany.mockResolvedValue(projects);

    await expect(service.getProjects('profile-main')).resolves.toEqual(projects);
    expect(prisma.project.findMany).toHaveBeenCalledWith({ where: { profileId: 'profile-main' }, orderBy: { name: 'asc' } });
  });
});
