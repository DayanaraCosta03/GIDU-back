import { Body, Controller, Post } from '@nestjs/common';

import { RegisterDTO } from './dto/register.dto';
import { RegisterService } from './services/register.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly registerService: RegisterService) {}

  @Post('register')
  register(@Body() body: RegisterDTO) {
    return this.registerService.run(body);
  }
}
