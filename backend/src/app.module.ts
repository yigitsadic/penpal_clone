import { Module } from '@nestjs/common';
import { CitiesModule } from './cities/cities.module';
import { LanguagesModule } from './languages/languages.module';
import { NotificationsModule } from './notifications/notifications.module';
import { TemplatesModule } from './templates/templates.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistrationsModule } from './registrations/registrations.module';
import { PasswordModule } from './password/password.module';
import { AuthModule } from './auth/auth.module';

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
    UsersModule,
    RegistrationsModule,
    PasswordModule,
    AuthModule,
  ],
})
export class AppModule {}
