import { UserEntity } from '@/user/entities/user.entity';
import { IJWTPayloadData } from '../interfaces';

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
}
