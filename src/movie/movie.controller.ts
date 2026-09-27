import { Controller,  Post, Body, UseGuards } from '@nestjs/common';
import { MovieService } from './movie.service.js';
import { CreateMovieDto } from './dto/create-movie.dto.js';
import { JwtAuthGuard } from '../auth/guards/roles/jwt_auth.guard.js';
import { RolesGuard } from '../auth/guards/roles/roles.guard.js';
import { Roles } from '../decorators/roles.decorator.js';
import { UserRole } from '../enums/user-role.enum.js';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

}
