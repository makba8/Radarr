import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './database/database.module';
import { UserModule } from './modules/user/user.module';
import { MediaModule } from './modules/media/media.module';
import { EpisodeModule } from './modules/episode/episode.module';
import { ProgressModule } from './modules/progress/progress.module';
import { ServiceModule } from './modules/service/service.module';
import { UserServiceModule } from './modules/user-service/user-service.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rendre les variables accessibles partout
      envFilePath: '.env', // Charge le fichier .env
    }),
    DatabaseModule, // IMPORTANT : DatabaseModule vient APRÈS ConfigModule
    UserModule,
    MediaModule,
    EpisodeModule,
    ProgressModule,
    ServiceModule,
    UserServiceModule,
    AuthModule,
  ],
})
export class AppModule {}
