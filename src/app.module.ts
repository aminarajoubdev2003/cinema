import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { AuthModule } from './auth/auth.module.js';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module.js';
import { MovieModule } from './movie/movie.module.js';
import { HallModule } from './hall/hall.module.js';
import { ShowModule } from './show/show.module.js';
import { BookingModule } from './booking/booking.module.js';
import { DepositModule } from './deposit/deposit.module.js';
import { LoggerMiddleware } from './logger/logger.middleware.js';

@Module({
  imports: [
  AuthModule,
  ConfigModule.forRoot({ isGlobal: true }),
  PrismaModule,
  ConfigModule.forRoot({ isGlobal: true }),
  MovieModule,
  HallModule,
  ShowModule,
  BookingModule,
  DepositModule
],
  controllers: [AppController],
  providers: [AppService],
  
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
