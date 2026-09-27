import { Controller, Body, Patch, UseGuards } from '@nestjs/common';
import { DepositService } from './deposit.service.js';
import { UpdateDepositDto } from './dto/update-deposit.dto.js';
import { JwtAuthGuard } from '../auth/guards/roles/jwt_auth.guard.js';
import { RolesGuard } from '../auth/guards/roles/roles.guard.js';
import { Roles } from '../decorators/roles.decorator.js';
import { UserRole } from '../enums/user-role.enum.js';

@Controller('deposit')
export class DepositController {
  constructor(private readonly depositService: DepositService) {}

  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  update(@Body() updateDepositDto: UpdateDepositDto) {
    return this.depositService.update(updateDepositDto);
  }


}
