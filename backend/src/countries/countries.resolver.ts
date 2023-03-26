import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CountryInput } from './dto/country.input';

@Resolver(() => Country)
export class CountriesResolver {
  constructor(private readonly countriesService: CountriesService) {}

  @Mutation(() => Country)
  createCountry(@Args('createCountryInput') createCountryInput: CountryInput) {
    return this.countriesService.create(createCountryInput);
  }

  @Query(() => [Country], { name: 'countries' })
  findAll() {
    return this.countriesService.findAll();
  }

  @Query(() => Country, { name: 'country' })
  findOne(@Args('code', { type: () => String }) code: string) {
    return this.countriesService.findOne(code);
  }

  @Mutation(() => Country)
  updateCountry(@Args('updateCountryInput') updateCountryInput: CountryInput) {
    return this.countriesService.update(
      updateCountryInput.code,
      updateCountryInput,
    );
  }

  @Mutation(() => Country)
  removeCountry(@Args('code', { type: () => String }) code: string) {
    return this.countriesService.remove(code);
  }
}
