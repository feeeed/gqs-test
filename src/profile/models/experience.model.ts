import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A work experience entry for the profile.' })
export class ExperienceModel {
  @Field(() => ID, { description: 'Unique identifier of the experience record.' })
  id: string;

  @Field(() => String, { description: 'Company name.' })
  company: string;

  @Field(() => String, { description: 'Job title or position.' })
  position: string;

  @Field(() => String, { description: 'Human readable period label.' })
  period: string;

  @Field(() => Date, { description: 'Start date used for chronological sorting.' })
  startDate: Date;

  @Field(() => Date, { nullable: true, description: 'End date for completed roles.' })
  endDate?: Date | null;

  @Field(() => [String], { description: 'Achievement bullet points from that role.' })
  achievements: string[];

  @Field({ description: 'Profile identifier associated with this experience.' })
  profileId: string;
}
