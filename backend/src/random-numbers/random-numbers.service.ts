import { Injectable, PayloadTooLargeException } from '@nestjs/common';
import { RandomNumber } from './entities/random-number.entity';

@Injectable()
export class RandomNumbersService {
  public static readonly MAX_COUNT = 10000;
  public static readonly MAX_VALUE = 10000;

  generate(count: number): RandomNumber[] {
    if (count > RandomNumbersService.MAX_COUNT) {
      throw new PayloadTooLargeException(
        `Too many random numbers requested (${count})`,
      );
    }
    return Array.from({ length: count }, (ignored, index) => ({
      index: index,
      value: Math.random() * RandomNumbersService.MAX_VALUE,
    }));
  }
}
