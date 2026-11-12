import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, beforeEach, vi } from 'vitest';
import { ProfileResolver } from './profile.resolver.js';
import { ProfileService } from './profile.service.js';

describe('ProfileResolver', () => {
  let resolver: ProfileResolver;
  const profileService = {
    getProfile: vi.fn(),
    getLinks: vi.fn(),
    getSkills: vi.fn(),
    getExperience: vi.fn(),
    getProjects: vi.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProfileResolver,
        {
          provide: ProfileService,
          useValue: profileService,
        },
      ],
    }).compile();

    resolver = module.get<ProfileResolver>(ProfileResolver);
    vi.clearAllMocks();
  });

  it('delegates the root query to the profile service', async () => {
    const profile = {
      id: 'profile-main',
      name: 'Alex Morgan',
      description: 'Backend engineer',
      createdAt: new Date('2023-01-01T00:00:00.000Z'),
      updatedAt: new Date('2024-01-01T00:00:00.000Z'),
    };
    profileService.getProfile.mockResolvedValue(profile);

    await expect(resolver.getProfile()).resolves.toEqual(profile);
    expect(profileService.getProfile).toHaveBeenCalledTimes(1);
  });

  it('resolves nested profile fields lazily', async () => {
    const profile = { id: 'profile-main' } as any;
    const links = [{ id: 'link-1', platform: 'GitHub', url: 'https://github.com/test', profileId: 'profile-main' }];
    const skills = [{ id: 'skill-1', name: 'TypeScript', category: 'Language', level: 'Expert', order: 1, profileId: 'profile-main' }];
    const experience = [{ id: 'exp-1', company: 'Northstar', position: 'Engineer', period: '2023', startDate: new Date('2023-01-01'), endDate: null, achievements: ['Built apps'], profileId: 'profile-main' }];
    const projects = [{ id: 'project-1', name: 'Alpha', description: 'Demo', url: 'https://example.com', profileId: 'profile-main' }];

    profileService.getLinks.mockResolvedValue(links);
    profileService.getSkills.mockResolvedValue(skills);
    profileService.getExperience.mockResolvedValue(experience);
    profileService.getProjects.mockResolvedValue(projects);

    await expect(resolver.links(profile)).resolves.toEqual(links);
    await expect(resolver.skills(profile)).resolves.toEqual(skills);
    await expect(resolver.experience(profile)).resolves.toEqual(experience);
    await expect(resolver.projects(profile)).resolves.toEqual(projects);

    expect(profileService.getLinks).toHaveBeenCalledWith('profile-main');
    expect(profileService.getSkills).toHaveBeenCalledWith('profile-main');
    expect(profileService.getExperience).toHaveBeenCalledWith('profile-main');
    expect(profileService.getProjects).toHaveBeenCalledWith('profile-main');
  });
});
