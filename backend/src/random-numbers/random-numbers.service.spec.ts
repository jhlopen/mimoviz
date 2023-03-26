import { Test, TestingModule } from '@nestjs/testing';
import { RandomNumbersService } from './random-numbers.service';

describe('RandomNumbersService', () => {
  let service: RandomNumbersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RandomNumbersService],
    }).compile();

    service = module.get<RandomNumbersService>(RandomNumbersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
