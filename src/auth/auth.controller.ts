// src/auth/auth.controller.ts
import { Controller, Post, UseGuards, Get, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login-auth.dto';
import { RegisterAuthDto } from './dtos/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  async register(@Body() createFullUserDto: RegisterAuthDto): Promise<{ message: string }> {
    return this.authService.registerFullUser(createFullUserDto);
  }


}