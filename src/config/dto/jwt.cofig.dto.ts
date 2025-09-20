import { IsString } from 'class-validator';

export class JwtConfigDto {
  @IsString()
  secret: string;

  @IsString()
  expiresIn: string;
}
