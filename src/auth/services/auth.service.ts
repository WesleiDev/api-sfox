import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignDto } from '../dto';
import { UserService } from '@/user/services/user.service';
import { AuthUtils } from '@/common/utils';
import { UserEntity } from '@/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { AuthMapper } from '../mappers';
import { ConfigService } from '@nestjs/config';
import { JwtConfigDto } from '@/config/dto/jwt.cofig.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async sign(data: SignDto) {
    const user = await this.userService.findByMail(data.mail);

    if (!user) {
      throw new NotFoundException('Customer not found!');
    }

    const isValidPassword = AuthUtils.comparePasswords(
      data.password,
      user.password,
    );

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password!');
    }

    return this._generateUserToken(user);
  }

  private _generateUserToken(user: UserEntity) {
    const { secret, expiresIn } = this.configService.get<JwtConfigDto>('jwt')!;

    const payloadJwt = AuthMapper.mapPayloadJwt(user);

    const accessToken = this.jwtService.sign(payloadJwt, {
      secret,
      expiresIn,
    });

    const { exp } = this.jwtService.decode<{ exp: number }>(accessToken);

    return AuthMapper.mapUserTokenResponse({
      token: accessToken,
      expiresIn: exp,
    });
  }
}
