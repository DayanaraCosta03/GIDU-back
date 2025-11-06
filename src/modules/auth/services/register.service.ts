import { Injectable } from '@nestjs/common';

import { RegisterDTO } from '../dto/register.dto';

@Injectable()
export class RegisterService {
  async run(body: RegisterDTO) {
    console.log(body);
  }
}
