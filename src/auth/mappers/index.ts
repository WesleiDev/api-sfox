import { UserEntity } from '@/user/entities/user.entity';
import { IJWTPayloadData } from '../interfaces';
import { AuthUserDto } from '../dto';
import { AccountMapper } from '@/account/mapprs';

type ParamMapUserTokenResponse = {
  token: string;
  expiresIn: number;
};

export class AuthMapper {
  static mapPayloadJwt(user: UserEntity): IJWTPayloadData {
    return {
      id: user.id,
      fullname: `${user.firstName} ${user.lastName}`,
    };
  }

  static mapUserTokenResponse(data: ParamMapUserTokenResponse) {
    return {
      accessToken: data.token,
      expiresIn: data.expiresIn,
    };
  }

  static mapAuthUser(user: UserEntity): AuthUserDto {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstName: user.firstName,
      lastName: user.lastName,
      fullname: `${user.firstName} ${user.lastName}`,
      mail: user.mail,
      account: AccountMapper.mapAccountResponse(user.account),
    };
  }
}
