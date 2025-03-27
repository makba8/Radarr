import { Module } from '@nestjs/common';
import { UserServiceService } from './user-service.service';
import { UserServiceController } from './user-service.controller';

@Module({
  providers: [UserServiceService],
  controllers: [UserServiceController]
})
export class UserServiceModule {}
