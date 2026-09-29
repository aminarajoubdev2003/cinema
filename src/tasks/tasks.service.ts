import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class TasksService {
constructor(private prisma: PrismaService) {}
  
@Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    console.log('Cron running:', new Date());
    await this.prisma.$executeRaw`
      SELECT expire_bookings()
    `;
  }
}