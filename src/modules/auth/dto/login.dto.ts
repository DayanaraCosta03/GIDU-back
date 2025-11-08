import { IsString, Length } from 'class-validator';

export class LoginDTO {
  @IsString()
  @Length(8, 8)
  dni: string;

  @IsString()
  password: string;
}
