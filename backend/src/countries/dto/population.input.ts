import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class PopulationInput {
  @Field(() => String, { description: 'The year of the population data' })
  year: string;

  @Field(() => Int, { description: 'The total population' })
  count: number;
}
