import { Body, Controller, HttpCode, Post } from '@nestjs/common';

import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @Post('login')
  @HttpCode(200)
  login(@Body() body: LoginDTO) {
    return this.loginService.run(body);
  }

  @Post('register')
  @HttpCode(201)
  register(@Body() body: RegisterDTO) {
    return this.registerService.run(body);
  }
}
