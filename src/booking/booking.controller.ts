import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service.js';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { JwtAuthGuard } from '../auth/guards/roles/jwt_auth.guard.js';
import { CurrentUser } from '../decorators/current-user.decorator.js';
import { PayBookingDto } from './dto/pay-for-booking.dto.js';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @CurrentUser() user: any) {
    return this.bookingService.create(createBookingDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('pay')
  pay(@Body() payBookingDto: PayBookingDto, @CurrentUser() user: any) {
    return this.bookingService.pay(payBookingDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@CurrentUser() user: any) {
    return this.bookingService.findAll(user.id);
  }

}
