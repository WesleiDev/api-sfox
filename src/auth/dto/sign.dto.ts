import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignDto {
  @IsEmail()
  @IsNotEmpty()
  mail: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
