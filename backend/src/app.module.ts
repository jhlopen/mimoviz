import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RandomNumbersModule } from './random-numbers/random-numbers.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/schema.gql',
    }),
    RandomNumbersModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
