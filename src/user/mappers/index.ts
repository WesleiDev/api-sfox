import { AuthUtils } from '@/common/utils';
import { CreateUserDto, UserResponseDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
  static mapPayloadCreateUser(data: CreateUserDto): Partial<UserEntity> {
    return {
      firstName: data.firstName,
      lastName: data.lastName,
      password: AuthUtils.hashPassword(data.password),
      mail: data.mail,
    };
  }

  static mapUserResponse(user: UserEntity): UserResponseDto {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      firstName: user.firstName,
      lastName: user.lastName,
      fullname: `${user.firstName} ${user.lastName}`,
      mail: user.mail,
    };
  }
}
