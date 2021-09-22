import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { LanguagesModule } from './languages/languages.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [CitiesModule, LanguagesModule, NotificationsModule],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class AppModule {}
