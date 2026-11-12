import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'A profile link to a social media or portfolio channel.' })
export class SocialLinkModel {
  @Field(() => ID, { description: 'Unique identifier of the social link.' })
  id: string;

  @Field({ description: 'Platform name, such as GitHub or LinkedIn.' })
  platform: string;

  @Field({ description: 'Fully qualified URL for the external profile or channel.' })
  url: string;

  @Field({ description: 'Profile identifier that owns this link.' })
  profileId: string;
}
