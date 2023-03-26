import { Resolver, Query, Args, Int, Float } from '@nestjs/graphql';
import { RandomNumber } from './entities/random-number.entity';
import { RandomNumbersService } from './random-numbers.service';

@Resolver(() => RandomNumber)
export class RandomNumbersResolver {
  constructor(private readonly randomNumbersService: RandomNumbersService) {}

  @Query(() => Int, {
    name: 'maxCount',
    description: 'The maximum number of random numbers per generation.',
  })
  getMaxCount() {
    return RandomNumbersService.MAX_COUNT;
  }

  @Query(() => Float, {
    name: 'maxValue',
    description: 'The maximum possible value of a random number.',
  })
  getMaxValue() {
    return RandomNumbersService.MAX_VALUE;
  }

  @Query(() => [RandomNumber], {
    name: 'randomNumbers',
    description: `Generate a sequence of random numbers between 0 and ${RandomNumbersService.MAX_VALUE}.`,
  })
  generateRandomNumbers(@Args('count', { type: () => Int }) count: number) {
    return this.randomNumbersService.generate(count);
  }
}
