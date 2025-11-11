import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { LoginDTO } from './dto/login.dto';
import { RegisterDTO } from './dto/register.dto';
import { LoginService } from './services/login.service';
import { RegisterService } from './services/register.service';
import { AuthGuard } from './guard/auth.guard';
import { JwtI } from 'src/types/jwt.type';
import { ProfileService } from './services/profile.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly profileService: ProfileService,
    private readonly registerService: RegisterService,
  ) {}
  @Get('/profile')
  @HttpCode(200)
  @UseGuards(AuthGuard)
  getProfile(@Req() req) {
    const userPayload: JwtI = req.user;
    return this.profileService.run(userPayload);
  }

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
