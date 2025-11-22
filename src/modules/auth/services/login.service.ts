import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { UserSchema } from 'src/database/schemas';
import { JwtI } from 'src/types/jwt.type';
import { Repository } from 'typeorm';

import { LoginDTO } from '../dto/login.dto';

@Injectable()
export class LoginService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserSchema)
    private readonly userRepo: Repository<UserSchema>,
  ) {}

  async run(body: LoginDTO) {
    const user = await this.userRepo.findOne({
      where: { dni: body.dni },
      relations: ['role'],
    });

    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    if (!(await argon2.verify(user.password, body.password)))
      throw new HttpException(
        'Credenciales invalidas',
        HttpStatus.UNAUTHORIZED,
      );

    const token = await this.jwtService.signAsync<JwtI>({ dni: body.dni });

    return {
      token: token,
      dni: user.dni,
      name: user.name,
      role: user.role.name,
    };
  }
}
