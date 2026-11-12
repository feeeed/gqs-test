import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A public-facing project linked to the profile.' })
export class ProjectModel {
  @Field(() => ID, { description: 'Unique identifier of the project.' })
  id: string;

  @Field({ description: 'Project name.' })
  name: string;

  @Field(() => String, { nullable: true, description: 'Short description or context for the project.' })
  description?: string | null;

  @Field({ description: 'Repository or live demo URL.' })
  url: string;

  @Field({ description: 'Profile identifier associated with the project.' })
  profileId: string;
}
