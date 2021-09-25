import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { LanguagesModule } from './languages/languages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TemplatesModule } from './templates/templates.module';
import { ConversationsModule } from './conversations/conversations.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsModule } from './registrations/registrations.module';
import { PasswordModule } from './password/password.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5500,
      username: 'penpal',
      password: 'password',
      database: 'penpal_clone',
      synchronize: false,
      autoLoadEntities: true,
    }),
    CitiesModule,
    LanguagesModule,
    NotificationsModule,
    TemplatesModule,
    ConversationsModule,
    UsersModule,
    RegistrationsModule,
    PasswordModule,
  ],
})
export class AppModule {}
