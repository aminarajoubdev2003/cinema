import { Module } from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { MovieController } from './movie.controller.js';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
