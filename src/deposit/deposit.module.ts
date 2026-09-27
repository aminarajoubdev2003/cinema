import { Module } from '@nestjs/common';
import { DepositService } from './deposit.service.js';
import { DepositController } from './deposit.controller.js';

@Module({
  controllers: [DepositController],
  providers: [DepositService],
})
export class DepositModule {}
