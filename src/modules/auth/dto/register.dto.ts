import { IsNumberString, IsString, Length, Matches } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @Length(8, 8)
  @IsNumberString()
  dni: string;

  @IsString()
  @Length(3, 100)
  name: string;

  @IsString()
  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/, {
    message:
      'Password must contain at least one lowercase letter, one uppercase letter, and one number.',
  })
  password: string;
}
