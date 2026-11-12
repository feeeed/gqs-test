import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ExperienceModel } from './experience.model.js';
import { ProjectModel } from './project.model.js';
import { SkillModel } from './skill.model.js';
import { SocialLinkModel } from './social-link.model.js';

@ObjectType({ description: 'A digital business card profile for a software engineer.' })
export class ProfileModel {
  @Field(() => ID, { description: 'Unique identifier of the profile.' })
  id: string;

  @Field({ description: 'Display name of the engineer.' })
  name: string;

  @Field({ description: 'Summary of the engineer and their profile.' })
  description: string;

  @Field(() => [SocialLinkModel], { description: 'External profiles and links associated with this person.' })
  links?: SocialLinkModel[];

  @Field(() => [SkillModel], { description: 'Technical skills and competencies associated with the profile.' })
  skills?: SkillModel[];

  @Field(() => [ExperienceModel], { description: 'Professional experience history for the profile.' })
  experience?: ExperienceModel[];

  @Field(() => [ProjectModel], { description: 'Public projects associated with the profile.' })
  projects?: ProjectModel[];

  @Field({ description: 'Creation timestamp for the profile record.' })
  createdAt?: Date;

  @Field({ description: 'Last update timestamp for the profile record.' })
  updatedAt?: Date;
}
