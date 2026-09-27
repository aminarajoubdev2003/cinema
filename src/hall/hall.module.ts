import { Module } from '@nestjs/common';
import { HallService } from './hall.service.js';
import { HallController } from './hall.controller.js';

@Module({
  controllers: [HallController],
  providers: [HallService],
})
export class HallModule {}
