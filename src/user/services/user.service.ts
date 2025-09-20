import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto, UserResponseDto } from '../dto';
import { UserRepository } from '../repository/user.repository';
import { UserMapper } from '../mappers';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: CreateUserDto): Promise<UserResponseDto> {
    await this.checkCustomerAlreadyCreate(data.mail);

    const payload = UserMapper.mapPayloadCreateUser(data);

    const userCreated = await this.userRepository.save(payload);

    return UserMapper.mapUserResponse(userCreated);
  }

  async checkCustomerAlreadyCreate(mail: string) {
    const customer = await this.findByMail(mail);

    if (customer) {
      throw new ConflictException(`Customer with mail ${mail} already exist!`);
    }
  }

  findByMail(mail): Promise<UserEntity | null> {
    return this.userRepository.findByMail(mail);
  }
}
