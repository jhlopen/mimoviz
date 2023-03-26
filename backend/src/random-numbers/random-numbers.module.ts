import { Module } from '@nestjs/common';
import { RandomNumbersService } from './random-numbers.service';
import { RandomNumbersResolver } from './random-numbers.resolver';

@Module({
  providers: [RandomNumbersResolver, RandomNumbersService],
})
export class RandomNumbersModule {}
