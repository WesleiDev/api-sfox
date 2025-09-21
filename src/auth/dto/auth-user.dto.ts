import { AccountResponseDto } from '@/account/dto';

export class AuthUserDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  fullname: string;
  mail: string;
  account: AccountResponseDto;
}
