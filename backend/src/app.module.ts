import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomNumbersModule } from './random-numbers/random-numbers.module';

@Module({
  imports: [RandomNumbersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
