import { Module } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { AuthController } from './auth.controller.js';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy.js';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
imports:[
  ConfigModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
    secret: configService.getOrThrow<string>('JWT_SECRET'),
    signOptions: { expiresIn: '24h'},
    })
    }),
  PassportModule.register({defaultStrategy: 'jwt'})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule,JwtModule],
})
export class AuthModule {}
