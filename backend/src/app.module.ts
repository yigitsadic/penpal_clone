import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { LanguagesModule } from './languages/languages.module';
import { NotificationsService } from './notifications/notifications.service';
import { NotificationsController } from './notifications/notifications.controller';
import { NotificationsModule } from './notifications/notifications.module';
import { TemplatesController } from './templates/templates.controller';
import { TemplatesService } from './templates/templates.service';
import { TemplatesModule } from './templates/templates.module';
import { ConversationsModule } from './conversations/conversations.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    CitiesModule,
    LanguagesModule,
    NotificationsModule,
    TemplatesModule,
    ConversationsModule,
    UsersModule,
  ],
  controllers: [NotificationsController, TemplatesController],
  providers: [NotificationsService, TemplatesService],
})
export class AppModule {}
