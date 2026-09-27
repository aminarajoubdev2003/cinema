import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { HallService } from './hall.service.js';
import { CreateHallDto } from './dto/create-hall.dto.js';
import { Roles } from '../decorators/roles.decorator.js';
import { UserRole } from '../enums/user-role.enum.js';
import { JwtAuthGuard } from '../auth/guards/roles/jwt_auth.guard.js';
import { RolesGuard } from '../auth/guards/roles/roles.guard.js';

@Controller('hall')
export class HallController {
  constructor(private readonly hallService: HallService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Post()
  create(@Body() createHallDto: CreateHallDto) {
    return this.hallService.create(createHallDto);
  }
}
