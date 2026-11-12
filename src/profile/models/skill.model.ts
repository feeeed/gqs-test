import { Field, ID, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Technology or competency associated with the profile.' })
export class SkillModel {
  @Field(() => ID, { description: 'Unique identifier of the skill.' })
  id: string;

  @Field({ description: 'Skill name.' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Skill category such as Backend, Frontend, or DevOps.' })
  category?: string | null;

  @Field(() => String, { nullable: true, description: 'Experience level for this skill.' })
  level?: string | null;

  @Field(() => Int, { description: 'Display order within the skill list.' })
  order: number;

  @Field({ description: 'Profile identifier associated with this skill.' })
  profileId: string;
}
