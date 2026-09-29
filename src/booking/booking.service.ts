import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto.js';
import { PayBookingDto } from './dto/pay-for-booking.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class BookingService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, user_id: number) {
    try {
      const booking = await this.prisma.$queryRaw<
        {
          user_id: number;
          show_id: number;
          seat_id: number;
          status: string;
          expires_at: Date;
          created_at: Date;
          amount: number;
        }[]
      >` SELECT * FROM create_booking(
      ${user_id}::INT,
      ${createBookingDto.show_id}::INT,
      ${createBookingDto.seat_id}::INT
      )`;
      return booking[0];
    } catch (error) {
      if (error instanceof Error && error.message.includes('SHOW_NOT_FOUND')) {
        throw new NotFoundException('show not found');
      }
      if (error instanceof Error && error.message.includes('SEAT_NOT_FOUND')) {
        throw new NotFoundException('seat not found');
      }
      if (
        error instanceof Error &&
        error.message.includes('SEAT_ALREADY_BOOKED')
      ) {
        throw new ConflictException('seat already booked');
      }
      throw error;
    }
  }

  async pay(payBookingDto: PayBookingDto, user_id: number) {
    try {
      const payment = await this.prisma.$queryRaw<
        {
          user_id: number;
          show_id: number;
          seat_id: number;
          status: string;
          expires_at: Date;
          created_at: Date;
          amount: number;
        }[]
      >` SELECT * FROM pay(
      ${user_id}::INT,
      ${payBookingDto.booking_id}::INT
      )`;

      return payment[0];

    } catch (error) {
      if (error instanceof Error && error.message.includes('USER_NOT_FOUND')) {
        throw new NotFoundException('user not found');
      }
      if (error instanceof Error && error.message.includes('BOOKING_NOT_AVAILABLE')) {
        throw new ConflictException('booking not available');
      }
      if (
        error instanceof Error &&
        error.message.includes('INSUFFICIENT_BALANCE')
      ) {
        throw new ConflictException('insufficient balance');
      }
      throw error;
    }
  }

  async findAll(user_id: number) {
    const bookings = await this.prisma.$queryRaw<
    {
    booking_id: number
    movie_title: string 
    hall_name: string
    seat_row: string 
    seat_number: number
    show_start_time: Date 
    show_end_time: Date 
    status: string
    expires_at: Date 
    amount: number 
    created_at: Date
    }[]
      >` SELECT * FROM get_user_bookings(
      ${user_id}::INT
      )`;
    return bookings;
  }

  
}
