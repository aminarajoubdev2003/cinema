import { ConflictException, Injectable } from '@nestjs/common';
import { CreateHallDto } from './dto/create-hall.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class HallService {
  constructor( private readonly prisma: PrismaService ){}

  async create(createHallDto: CreateHallDto) {
    try{
      const hall = await this.prisma.$queryRaw< 
      { 
        hall_name : string
      }[] >
      ` SELECT * FROM create_hall(${createHallDto.name}::TEXT)`; 
  
      return hall[0];
      
    }catch (error){
      if ( error instanceof Error && error.message.includes('HALL_ALREADY_EXISTS') ) { 
        throw new ConflictException('Hall already exists')
      } 
      throw error
    }
  }

}
