import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service.js';
import { UserRole } from '../enums/user-role.enum.js';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor( private readonly prisma: PrismaService , private readonly jwtService:JwtService ){}

  async create(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try{
    const user = await this.prisma.$queryRaw< 
    { user_id: number;
      user_name: string;
      user_email: string;
    }[] >
    ` SELECT * FROM register( 
    ${registerDto.name}::TEXT, 
    ${registerDto.email}::TEXT, 
    ${hashedPassword}::TEXT, 
    ${UserRole.MEMBER}::TEXT )`; 
    return user[0];

    }catch (error){
      if ( error instanceof Error && error.message.includes('EMAIL_ALREADY_EXISTS') ) { 
        throw new ConflictException('Email already exists')
      } 
      throw error
    }
  }

  async login(loginDto: LoginDto) {
    let user;
    try{
    user = await this.prisma.$queryRaw< 
    { 
      user_id: number
      user_email: string
      user_password: string
      user_role: string
    }[] >
    ` SELECT * FROM login(${loginDto.email}::TEXT )`;
  
    }catch (error){

      if ( error instanceof Error && error.message.includes('INVALID_EMAIL') ) { 
        throw new UnauthorizedException('Invalid email')
      } 
      throw error
    }
    const userData = user[0]

    const password = await bcrypt.compare(loginDto.password,userData.user_password)
    if( !password ){
      throw new UnauthorizedException('Invalid password');
    }

    const accessToken = this.jwtService.sign({
      sub:userData.user_id,
      email:userData.user_email,
      role:userData.user_role
    })
    return accessToken
  }

}
