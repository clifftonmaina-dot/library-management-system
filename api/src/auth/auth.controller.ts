import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body()
    data: {
      name: string;
      email: string;
      password: string;
    },
  ) {
    return this.authService.register(data);
  }

  @Post('login')
  login(
    @Body()
    data: {
      email: string;
      password: string;
    },
  ) {
    return this.authService.login(data);
  }
}