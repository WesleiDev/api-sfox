import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtConfigDto } from '@/config/dto/jwt.cofig.dto';
import { IJWTPayloadData } from '../interfaces';
import { UserService } from '@/user/services/user.service';
import { AuthMapper } from '../mappers';
import { AuthUserDto } from '../dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {
    const config = configService.get<JwtConfigDto>('jwt')!;
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.secret,
    });
  }

  async validate(payload: IJWTPayloadData): Promise<AuthUserDto> {
    const user = await this.userService.findById(payload.id, ['account']);

    if (!user) {
      throw new UnauthorizedException();
    }

    return AuthMapper.mapAuthUser(user);
  }
}
