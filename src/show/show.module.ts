import { Module } from '@nestjs/common';
import { ShowService } from './show.service.js';
import { ShowController } from './show.controller.js';

@Module({
  controllers: [ShowController],
  providers: [ShowService],
})
export class ShowModule {}
