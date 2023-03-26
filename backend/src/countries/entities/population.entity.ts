import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Population {
  @Field(() => String, { description: 'The year of the population data' })
  year: string;

  @Field(() => Int, { description: 'The total population' })
  count: number;
}
