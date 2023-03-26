import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { Country, CountrySchema } from './entities/country.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Country.name, schema: CountrySchema }]),
  ],
  providers: [CountriesResolver, CountriesService],
})
export class CountriesModule {}
