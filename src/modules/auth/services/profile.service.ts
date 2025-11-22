import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserSchema } from 'src/database/schemas';
import { JwtI } from 'src/types/jwt.type';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepo: Repository<UserSchema>,
  ) {}

  async run(payload: JwtI) {
    const user = await this.userRepo.findOne({
      where: { dni: payload.dni },
      relations: ['role'],
    });

    if (!user)
      throw new HttpException('Usuario no encontrado', HttpStatus.NOT_FOUND);

    return {
      dni: user.dni,
      name: user.name,
      role: user.role.name,
    };
  }
}
