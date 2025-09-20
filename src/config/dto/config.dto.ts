import { ValidateNested } from 'class-validator';
import { JwtConfigDto } from './jwt.cofig.dto';

export class ConfigDto {
  @ValidateNested({ each: true })
  jwt: JwtConfigDto;
}
