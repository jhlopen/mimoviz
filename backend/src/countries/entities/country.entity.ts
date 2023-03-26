import { HydratedDocument } from 'mongoose';
import { SchemaFactory, Schema, Prop } from '@nestjs/mongoose';
import { ObjectType, Field } from '@nestjs/graphql';
import { Population } from './population.entity';

export type CountryDocument = HydratedDocument<Country>;

@Schema()
@ObjectType()
export class Country {
  @Prop()
  @Field(() => String, { description: 'Country code (ISO 3166-1 alpha-2)' })
  code: string;

  @Prop()
  @Field(() => String, { description: 'Country name' })
  name: string;

  @Prop()
  @Field(() => String, { description: 'Country emoji' })
  emoji: string;

  @Prop({ type: [{ year: { type: String }, count: { type: Number } }] })
  @Field(() => [Population], { description: 'Country population by year' })
  populations: Population[];
}

export const CountrySchema = SchemaFactory.createForClass(Country);
