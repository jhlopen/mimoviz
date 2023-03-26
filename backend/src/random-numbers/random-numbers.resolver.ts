import { Resolver } from '@nestjs/graphql';
import { RandomNumbersService } from './random-numbers.service';

@Resolver()
export class RandomNumbersResolver {
  constructor(private readonly randomNumbersService: RandomNumbersService) {}
}
