import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { ShowService } from './show.service.js';
import { CreateShowDto } from './dto/create-show.dto.js';
import { Roles } from '../decorators/roles.decorator.js';
import { JwtAuthGuard } from '../auth/guards/roles/jwt_auth.guard.js';
import { RolesGuard } from '../auth/guards/roles/roles.guard.js';
import { UserRole } from '../enums/user-role.enum.js';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  create(@Body() createShowDto: CreateShowDto) {
    return this.showService.create(createShowDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.showService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':show_id')
  GetSeats(@Param('show_id', ParseIntPipe) show_id: number) {
    return this.showService.get_seats(show_id);
  }

  
}
