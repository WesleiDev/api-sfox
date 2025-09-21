import { Body, Controller, Get, UseGuards } from '@nestjs/common';

import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@/auth/decorators/user.decorator';
import { UserResponseDto } from '../dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  me(@User() user: UserResponseDto) {
    return user;
  }
}
