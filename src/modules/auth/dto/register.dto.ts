import {
  IsString,
  Length,
  IsNumberString,
  Matches,
  IsEnum,
} from 'class-validator';

export enum WorkAreaEnum {
  OBRAS = 'Obras',
  CATASTRO = 'Catastro',
  DEFENSA_CIVIL = 'Defensa Civil',
}

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

  @IsEnum(WorkAreaEnum, {
    message: 'Area must be one of: Obras, Catastro, Defensa Civil',
  })
  area: WorkAreaEnum;
}
