import { ConflictException, Injectable } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class MovieService {
  constructor( private readonly prisma: PrismaService ){}

  async create(createMovieDto: CreateMovieDto) {
  try{
    const movie = await this.prisma.$queryRaw< 
    { 
      movie_title: string
      }[] >
      ` SELECT * FROM create_moive(${createMovieDto.title}::TEXT)`; 

      return movie[0];
    
    }catch (error){
      if ( error instanceof Error && error.message.includes('MOVIE_ALREADY_EXISTS') ) { 
        throw new ConflictException('Movie already exists')
      } 
      throw error
    }
  }
  
}
