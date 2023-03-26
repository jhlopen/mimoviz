import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class RandomNumber {
  @Field(() => Int, { description: 'Number index' })
  index: number;

  @Field(() => Float, { description: 'Number value' })
  value: number;
}
