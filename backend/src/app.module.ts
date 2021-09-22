import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { LanguagesModule } from './languages/languages.module';

@Module({
  imports: [CitiesModule, LanguagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
