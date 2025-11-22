import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import argon2 from 'argon2';
import { RoleSchema, UserSchema } from 'src/database/schemas';
import { Repository } from 'typeorm';

import { RegisterDTO } from '../dto/register.dto';

@Injectable()
export class RegisterService {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepo: Repository<RoleSchema>,
    @InjectRepository(UserSchema)
    private readonly userRepo: Repository<UserSchema>,
  ) {}

  async run(body: RegisterDTO) {
    if (await this.userRepo.existsBy({ dni: body.dni }))
      throw new HttpException(
        `Ya existe un usuario con DNI ${body.dni}.`,
        HttpStatus.CONFLICT,
      );

    const employeeRole = await this.roleRepo.findOneBy({ name: 'Operador' });
    if (!employeeRole)
      throw new HttpException(
        'Opps! Hubo un error. Intentelo más tarde o contactenos.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const newUser = this.userRepo.create({
      dni: body.dni,
      name: body.name,
      password: await argon2.hash(body.password),
      role: employeeRole,
    });

    await this.userRepo.save(newUser);
  }
}
