import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ProfileModel } from './models/profile.model.js';
import { ExperienceModel } from './models/experience.model.js';
import { ProjectModel } from './models/project.model.js';
import { SkillModel } from './models/skill.model.js';
import { SocialLinkModel } from './models/social-link.model.js';
import { ProfileService } from './profile.service.js';

@Resolver(() => ProfileModel)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => ProfileModel, {
    name: 'profile',
    description: 'Returns the primary profile for the digital business card.',
  })
  async getProfile(): Promise<ProfileModel> {
    return this.profileService.getProfile();
  }

  @ResolveField(() => [SocialLinkModel], {
    description: 'Returns the profile links in deterministic order.',
  })
  async links(@Parent() profile: ProfileModel): Promise<SocialLinkModel[]> {
    return this.profileService.getLinks(profile.id);
  }

  @ResolveField(() => [SkillModel], {
    description: 'Returns the skill list in deterministic order.',
  })
  async skills(@Parent() profile: ProfileModel): Promise<SkillModel[]> {
    return this.profileService.getSkills(profile.id);
  }

  @ResolveField(() => [ExperienceModel], {
    description: 'Returns the work experience items in reverse chronological order.',
  })
  async experience(@Parent() profile: ProfileModel): Promise<ExperienceModel[]> {
    return this.profileService.getExperience(profile.id);
  }

  @ResolveField(() => [ProjectModel], {
    description: 'Returns all project entries for the profile.',
  })
  async projects(@Parent() profile: ProfileModel): Promise<ProjectModel[]> {
    return this.profileService.getProjects(profile.id);
  }
}
