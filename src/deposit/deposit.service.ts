import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateDepositDto } from './dto/update-deposit.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class DepositService {
  constructor(private readonly prisma: PrismaService) {}
  

  async update(updateDepositDto: UpdateDepositDto) {
  try{
      const user = await this.prisma.$queryRaw< 
      { email: string
       balance: number
      }[] >
      ` SELECT * FROM deposit(
      ${updateDepositDto.email}::TEXT,
      ${updateDepositDto.amount}::DECIMAL
       )`;

      return user[0]

    }catch (error){

      if ( error instanceof Error && error.message.includes('INVALID_EMAIL') ) { 
        throw new UnauthorizedException('Invalid email')
      } 
      throw error
    }
  }

  
}
