import { InputType, Field } from '@nestjs/graphql';
import { PopulationInput } from './population.input';

@InputType()
export class CountryInput {
  @Field(() => String, { description: 'Country code (ISO 3166-1 alpha-2)' })
  code: string;

  @Field(() => String, { description: 'Country name' })
  name: string;

  @Field(() => String, { description: 'Country emoji' })
  emoji: string;

  @Field(() => [PopulationInput], { description: 'Country population by year' })
  populations: PopulationInput[];
}
