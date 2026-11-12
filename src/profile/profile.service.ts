import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  async getProfile() {
    const profile = await this.prisma.profile.findFirst({
      orderBy: { createdAt: 'asc' },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  async getLinks(profileId: string) {
    return this.prisma.socialLink.findMany({
      where: { profileId },
      orderBy: { platform: 'asc' },
    });
  }

  async getSkills(profileId: string) {
    return this.prisma.skill.findMany({
      where: { profileId },
      orderBy: [{ order: 'asc' }, { name: 'asc' }],
    });
  }

  async getExperience(profileId: string) {
    return this.prisma.experience.findMany({
      where: { profileId },
      orderBy: [{ startDate: 'desc' }, { company: 'asc' }],
    });
  }

  async getProjects(profileId: string) {
    return this.prisma.project.findMany({
      where: { profileId },
      orderBy: { name: 'asc' },
    });
  }
}
