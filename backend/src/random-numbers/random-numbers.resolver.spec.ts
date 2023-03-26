import { Test, TestingModule } from '@nestjs/testing';
import { RandomNumbersResolver } from './random-numbers.resolver';
import { RandomNumbersService } from './random-numbers.service';

describe('RandomNumbersResolver', () => {
  let resolver: RandomNumbersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomNumbersResolver, RandomNumbersService],
    }).compile();

    resolver = module.get<RandomNumbersResolver>(RandomNumbersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
