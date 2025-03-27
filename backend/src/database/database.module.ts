import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../modules/user/user.entity';
import { Media } from '../modules/media/media.entity';
import { Episode } from '../modules/episode/episode.entity';
import { Progress } from '../modules/progress/progress.entity';
import { Service } from '../modules/service/service.entity';
import { UserService } from '../modules/user-service/user-service.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [User, Media, Episode, Progress, Service, UserService],
        synchronize: true, // ⚠️ Désactiver après le premier lancement
      }),
    }),
  ],
})
export class DatabaseModule {}