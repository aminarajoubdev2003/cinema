import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ShowService {
  constructor( private readonly prisma: PrismaService ){}

  async create(createShowDto: CreateShowDto) {
  try{
      const show = await this.prisma.$queryRaw< 
      { 
        hall_id : number
        movie_id : number
        start_time : Date
        end_time : Date
      }[] >
      ` SELECT * FROM create_show(
      ${createShowDto.hall_id}::INT,
      ${createShowDto.movie_id}::INT,
      ${createShowDto.start_time}::TIMESTAMP,
      ${createShowDto.end_time}::TIMESTAMP)`; 
      
      return show[0];
          
    }catch (error){
      if ( error instanceof Error && error.message.includes('INVALID_SHOW_TIME') ) { 
        throw new ConflictException('invalid show time')
      }
      if ( error instanceof Error && error.message.includes('SHOW_MUST_BE_AT_LEAST_24_HOURS_AHEAD') ) { 
        throw new ConflictException('show must be at least 24 hours ahead')
      }
      if ( error instanceof Error && error.message.includes('SHOW_MUST_BE_ON_SAME_DAY')) {
        throw new ConflictException('Show start time and end time must be on the same day');
      }
      if ( error instanceof Error && error.message.includes('HALL_NOT_FOUND') ) { 
        throw new NotFoundException('Hall not found')
      }
      if ( error instanceof Error && error.message.includes('MOVIE_NOT_FOUND') ) { 
        throw new NotFoundException('movie not found ')
      }
      if ( error instanceof Error && error.message.includes('SHOW_TIME_CONFLICT') ) { 
        throw new ConflictException('show time conflict')
      } 
      throw error
    }
  }

  async findAll() {
  const shows = await this.prisma.$queryRaw<
    {
      movie_title: string
      hall_name: string
      start_time : Date
      end_time : Date
    }[]
    >` SELECT * FROM get_shows()`;
    return shows;
  }

  async get_seats(show_id :number) {
  const seats = await this.prisma.$queryRaw<
    {
      seat_row: string
      seat_number: number
      price : number
    }[]
    >` SELECT * FROM get_seats(${show_id})`;
    return seats;
  }

  
}
