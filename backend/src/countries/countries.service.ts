import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Country, CountryDocument } from './entities/country.entity';
import { CountryInput } from './dto/country.input';

@Injectable()
export class CountriesService {
  constructor(
    @InjectModel(Country.name)
    private readonly countryModel: Model<CountryDocument>,
  ) {}

  async create(createCountryInput: CountryInput): Promise<Country> {
    const country = await this.countryModel
      .findOneAndUpdate(
        { code: createCountryInput.code },
        { $set: createCountryInput },
        { new: true, upsert: true },
      )
      .exec();
    return country;
  }

  async findAll(): Promise<Country[]> {
    return this.countryModel.find().exec();
  }

  async findOne(code: string): Promise<Country> {
    const country = await this.countryModel.findOne({ code: code }).exec();
    if (!country) {
      throw new NotFoundException(`Country '${code}' not found`);
    }
    return country;
  }

  async update(
    code: string,
    updateCountryInput: CountryInput,
  ): Promise<Country> {
    const country = await this.countryModel
      .findOneAndUpdate(
        { code: code },
        { $set: updateCountryInput },
        { new: true },
      )
      .exec();
    if (!country) {
      throw new NotFoundException(`Country '${code}' not found`);
    }
    return country;
  }

  async remove(code: string): Promise<Country> {
    const country = await this.countryModel
      .findOneAndDelete({ code: code })
      .exec();
    if (!country) {
      throw new NotFoundException(`Country '${code}' not found`);
    }
    return country;
  }
}
